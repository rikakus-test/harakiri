const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/users.model");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      userModel
        .getAll()
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Data Users");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Data Users");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Data Users");
    }
  },

  getUserDetail: async (req, res) => {
    try {
      const id = req.params.id;
      userModel
        .getById(id)
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
      const { home_id, pass, username, email, role, token } = req.body;
      const id = uuidv4();

      userModel
        .create({ id, home_id, pass, username, email, role, token })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menambahkan User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambahkan User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambahkan User");
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id, home_id, pass, username, email, role, token } = req.body;

      userModel
        .update({ id, home_id, pass, username, email, role, token })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Mengubah User");
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

      userModel
        .delete(id)
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
  bindingHome: async (req, res) => {
    try {
      const id = req.params.id;
      const {home_id} = req.body;

      userModel
        .binding({ id, home_id})
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Binding User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Binding User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Binding User");
    }
  },
};
