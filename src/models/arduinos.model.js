const db = require("../config/db");

const arduinosModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM arduinos`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM arduinos WHERE arduino_id='${id}'`,
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  add: ({ arduino_id, ip, login, password, arduino_name, status }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO arduinos (arduino_id, ip, login, password, arduino_name, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [arduino_id, ip, login, password, arduino_name, status],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  update: ({ arduino_id, ip, login, password, arduino_name, status }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE arduinos SET ip=?, login=?, password=?, arduino_name=?, status=? WHERE arduino_id=?`,
        [ip, login, password, arduino_name, status, arduino_id],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM arduinos WHERE arduino_id='${id}'`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};

module.exports = arduinosModel;
