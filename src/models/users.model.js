const db = require("../config/db");

const usersModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE user_id='${id}'`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  addUser: (data) => {
    const { user_id, home_id, username, pass, email, role } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (user_id, home_id, username, pass, email, role) VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, home_id, username, pass, email, role],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  updateUser: (data) => {
    const { user_id, home_id, username, pass, email, role } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET home_id=?, username=?, pass=?, email=?, role=? WHERE user_id=?`,
        [home_id, username, pass, email, role, user_id],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE user_id='${id}'`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};

module.exports = usersModel;
