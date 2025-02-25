const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const date = require("../helpers/date");
const itemsModel = require("../models/test.model");
const usersModel = require("../models/auth.model");

module.exports = {
  items: async (req, res) => {
    try {
      itemsModel
        .getAllData()
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Item");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Item");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Item");
    }
  },
  itemsDetail: async (req, res) => {
    try {
      itemsModel
        .getDataId()
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Item");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Item");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Item");
    }
  },
  addItems: async (req, res) => {
    try {
      const body = req.body;
      const { name, status} = body;
      const id = uuidv4();
      console.log(hadir);
      itemsModel
        .addItems({ id, name, status})
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menambah Item");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambah Item");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambah Item");
    }
  },
  itemStatus: async (req, res) => {
    try {
      const body = req.body;
      const { id, name, status} = body;
      itemsModel
        .editItems({ id, name, status})
        .then((result) => {
          success(
            res,
            { ...result, id },
            "success",
            "Berhasil Mengubah Item"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah Item");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah Item");
    }
  },
  deleteItems: async (req, res) => {
    try {
      const id = req.params.id;

      itemsModel.deleteItems(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menghapus Item");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menghapus Item");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus Item");
    }
  },
};
