const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const usersModel = require("../models/users.model");

module.exports = {
  getUsers: async (req, res) => {
    try {
      usersModel
        .getAllUsers()
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan User");
    }
  },

  getUserDetail: async (req, res) => {
    try {
      const id = req.params.id;
      usersModel
        .getUserById(id)
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Detail User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Detail User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Detail User");
    }
  },

  addUser: async (req, res) => {
    try {
      const { home_id, username, pass, email, role } = req.body;
      const user_id = uuidv4();
      usersModel
        .addUser({ user_id, home_id, username, pass, email, role })
        .then((result) => {
          success(
            res,
            { ...result, user_id },
            "success",
            "Berhasil Menambah User"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambah User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambah User");
    }
  },

  updateUser: async (req, res) => {
    try {
      const user_id = req.params.id;
      const { home_id, username, pass, email, role } = req.body;
      usersModel
        .updateUser({ user_id, home_id, username, pass, email, role })
        .then((result) => {
          success(
            res,
            { ...result, user_id },
            "success",
            "Berhasil Mengubah User"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah User");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      usersModel
        .deleteUser(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menghapus User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menghapus User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus User");
    }
  },
};
