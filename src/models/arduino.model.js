const db = require("../config/db");

const arduinoModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM arduino", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM arduino WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res[0]);
      });
    });
  },

  create: ({ id, home_id, name, status }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO arduino (id, home_id, name, status) VALUES (?, ?, ?, ?)`,
        [id, home_id, name, status],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  update: ({ id, home_id, name, status }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE arduino SET home_id = ?, name = ?, status = ? WHERE id = ?`,
        [home_id, name, status, id],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM arduino WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  getByIdWithDevices: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          a.*, 
          (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', d.id, 'name', d.name, 'status', d.status))
           FROM device d WHERE d.arduino_id = a.id) AS devices
        FROM arduino a
        WHERE a.id = ?;
      `;

      db.query(query, [id], (err, res) => {
        if (err) return reject(err);
        resolve(res[0]);
      });
    });
  },

  getStatusOnly: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT status FROM arduino WHERE id = ?", [id], (err, res) => {
        if (err) return reject(err);
        resolve(res[0]);
      });
    });
  },

  updateStatusOnly: (id, status) => {
    return new Promise((resolve, reject) => {
      db.query("UPDATE arduino SET status = ? WHERE id = ?", [status, id], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  },
};

module.exports = arduinoModel;
