const db = require("../config/db");

const deviceModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM device", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM device WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res[0]);
      });
    });
  },

  create: ({ id, arduino_id, name, status, start, end }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO device (id, arduino_id, name, status, start, end) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, arduino_id, name, status, start || null, end || null],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  update: ({ id, arduino_id, name, status, start, end }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE device SET arduino_id = ?, name = ?, status = ?, start = ?, end = ? WHERE id = ?`,
        [arduino_id, name, status, start || null, end || null, id],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM device WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};

module.exports = deviceModel;
