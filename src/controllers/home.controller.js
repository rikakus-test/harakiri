const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const homeModel = require("../models/home.model");

module.exports = {
  getAllHomes: async (req, res) => {
    try {
      homeModel
        .getAll()
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Data Home");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Data Home");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Data Home");
    }
  },

  getHomeDetail: async (req, res) => {
    try {
      const id = req.params.id;
      homeModel
        .getById(id)
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Detail Home");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Detail Home");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Detail Home");
    }
  },

  addHome: async (req, res) => {
    try {
      const { name } = req.body;
      const id = uuidv4();

      homeModel
        .create({ id, name })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menambahkan Home");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambahkan Home");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambahkan Home");
    }
  },

  updateHome: async (req, res) => {
    try {
      const { id, name } = req.body;

      homeModel
        .update({ id, name })
        .then((result) => {
          success(res, { ...result, id, name }, "success", "Berhasil Mengubah Home");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah Home");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah Home");
    }
  },

  deleteHome: async (req, res) => {
    try {
      const id = req.params.id;

      homeModel
        .delete(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menghapus Home");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menghapus Home");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus Home");
    }
  },
  detailWithRelations: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await homeModel.getHomeWithRelations(id);
      if (!result) {
        return failed(res, "Data tidak ditemukan", "failed", "Not Found");
      }
      success(res, result, "success", "Berhasil mendapatkan detail Home beserta relasinya");
    } catch (err) {
      failed(res, err.message, "failed", "Gagal mendapatkan data Home");
    }
  },
};
