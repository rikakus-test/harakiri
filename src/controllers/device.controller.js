const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const date = require("../helpers/date");
const deviceModel = require("../models/device.model");

module.exports = {
  items: async (req, res) => {
    try {
      deviceModel
        .getAll()
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Device");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Device");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Device");
    }
  },
  itemsDetail: async (req, res) => {
    try {
      const id = req.params.id;
      deviceModel
        .getById(id)
        .then(async (result) => {
          success(res, result, "success", "Berhasil Mendapatkan Device");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Device");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal  Mendapatkan Device");
    }
  },
  addItems: async (req, res) => {
    try {
      const body = req.body;
      const { arduino_id, name, status, start, end } = body;
      const id = uuidv4();
      deviceModel
        .create({ id, arduino_id, name, status, start, end })
        .then((result) => {
          success(
            res,
            { ...result, id },
            "success",
            "Berhasil Menambah Device"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambah Device");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambah Device");
    }
  },
updateItems: async (req, res) => {
  try {
    const body = req.body;
    const { id, arduino_id, name, status, start, end } = body;

    deviceModel
      .update({ id, arduino_id, name, status, start, end })
      .then((result) => {
        const updatedItem = { ...result, id, name, status, arduino_id };

        success(res, updatedItem, "success", "Berhasil Mengubah Device");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Gagal Mengubah Device");
      });
  } catch (err) {
    failed(res, err.message, "failed", "Gagal Mengubah Device");
  }
},
  deleteItems: async (req, res) => {
    try {
      const id = req.params.id;

      deviceModel
        .delete(id)
        .then((result) => {
          success(
            res,
            { ...result, id },
            "success",
            "Berhasil Menghapus Device"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menghapus Device");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus Device");
    }
  },
};
