const db = require("../config/db");

const homesModel = {
  getAllHomes: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM homes", (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  },

  getHomeById: (home_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM homes WHERE home_id = ?",
        [home_id],
        (err, res) => {
          if (err) return reject(err);
          resolve(res[0]);
        }
      );
    });
  },

  addHome: (data) => {
    const { home_id, arduino_id, home_name, tab_ip } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO homes (home_id, arduino_id, home_name, tab_ip) VALUES (?, ?, ?, ?)`,
        [home_id, arduino_id, home_name, tab_ip],
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });
  },

  updateHome: (data) => {
    const { home_id, arduino_id, home_name, tab_ip } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE homes SET arduino_id = ?, home_name = ?, tab_ip = ? WHERE home_id = ?`,
        [arduino_id, home_name, tab_ip, home_id],
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });
  },

  deleteHome: (home_id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM homes WHERE home_id = ?`, [home_id], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  },
};

module.exports = homesModel;
