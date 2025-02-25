const db = require("../config/db");

const itemsModel = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT  * FROM items`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getDataId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM items WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  addItems: (data) => {
    const { id, name, status } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO items (id, name, status) VALUES ('${id}','${name}','${status}') `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  editItems: (data) => {
    const { id, name, status} = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE items SET name='${name}',status='${status}' WHERE id='${id}' `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteItems: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM items WHERE id='${id}' `, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = itemsModel;
