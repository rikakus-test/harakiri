const db = require("../config/db");

const userModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res[0]);
      });
    });
  },

  create: ({ id, home_id, pass, username, email, role, token }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, home_id, pass, username, email, role, token) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, home_id || null, pass, username, email, role, token || null],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  update: ({ id, home_id, pass, username, email, role, token }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET home_id = ?, pass = ?, username = ?, email = ?, role = ?, token = ? WHERE id = ?`,
        [home_id || null, pass, username, email, role, token || null, id],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  binding: (id, home_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET home_id = ? WHERE id = ?",
        [home_id, id],
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });
  },
  getDataEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = userModel;
