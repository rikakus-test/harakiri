const db = require("../config/db");

const homeModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM home", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM home WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res[0]);
      });
    });
  },

  create: ({ id, name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO home (id, name) VALUES (?, ?)",
        [id, name],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        },
      );
    });
  },

  update: ({ id, name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE home SET name = ? WHERE id = ?",
        [name, id],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        },
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM home WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  getHomeWithRelations: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
SELECT 
  h.*,
  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', u.id,
        'username', u.username,
        'email', u.email
      )
    )
    FROM users u
    WHERE u.home_id = h.id
  ) AS users,

  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', a.id,
        'name', a.name,
        'status', a.status,
        'devices', (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', d.id,
              'name', d.name,
              'status', d.status
            )
          )
          FROM device d
          WHERE d.arduino_id = a.id
        )
      )
    )
    FROM arduino a
    WHERE a.home_id = h.id
  ) AS arduino

FROM home h
WHERE h.id = ?;
      `;

      db.query(query, [id], (err, res) => {
        if (err) return reject(err);
        resolve(res[0]);
      });
    });
  },
};

module.exports = homeModel;
