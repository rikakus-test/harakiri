const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const homesModel = require("../models/home.model");

module.exports = {
  getHomes: async (req, res) => {
    try {
      homesModel
        .getAllHomes()
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Semua Home");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Home");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Home");
    }
  },

  getHomeDetail: async (req, res) => {
    try {
      const id = req.params.id;
      homesModel
        .getHomeById(id)
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
      const { arduino_id, home_name, tab_ip } = req.body;
      const home_id = uuidv4();
      homesModel
        .addHome({ home_id, arduino_id, home_name, tab_ip })
        .then((result) => {
          success(
            res,
            { ...result, home_id },
            "success",
            "Berhasil Menambah Home"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambah Home");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambah Home");
    }
  },

  updateHome: async (req, res) => {
    try {
      const { arduino_id, home_name, tab_ip } = req.body;
      const home_id = req.params.id;
      homesModel
        .updateHome({ home_id, arduino_id, home_name, tab_ip })
        .then((result) => {
          success(
            res,
            { ...result, home_id },
            "success",
            "Berhasil Mengubah Home"
          );
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
      homesModel
        .deleteHome(id)
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
};
