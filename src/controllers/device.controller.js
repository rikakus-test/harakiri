const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const date = require("../helpers/date");
const deviceModel = require("../models/device.model");

module.exports = {
  items: async (req, res) => {
    try {
      deviceModel
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
      const id = req.params.id;
      deviceModel
        .getDataId(id)
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
      deviceModel
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
updateItems: async (req, res) => {
  try {
    const body = req.body;
    const { id, name, status } = body;

    deviceModel
      .editItems({ id, name, status })
      .then((result) => {
        const updatedItem = { ...result, id, name, status };

        success(res, updatedItem, "success", "Berhasil Mengubah Item");
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

      deviceModel.deleteItems(id)
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
