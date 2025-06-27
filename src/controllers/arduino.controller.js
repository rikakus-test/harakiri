const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const arduinoModel = require("../models/arduino.model");

module.exports = {
  getAllArduino: async (req, res) => {
    try {
      arduinoModel
        .getAll()
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Data Arduino");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Data Arduino");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Data Arduino");
    }
  },

  getArduinoDetail: async (req, res) => {
    try {
      const id = req.params.id;
      arduinoModel
        .getById(id)
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Detail Arduino");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Detail Arduino");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Detail Arduino");
    }
  },

  addArduino: async (req, res) => {
    try {
      const { home_id, name, status } = req.body;
      const id = uuidv4();

      arduinoModel
        .create({ id, home_id, name, status })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menambahkan Arduino");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambahkan Arduino");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambahkan Arduino");
    }
  },

  updateArduino: async (req, res) => {
    try {
      const { id, home_id, name, status } = req.body;

      arduinoModel
        .update({ id, home_id, name, status })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Mengubah Arduino");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah Arduino");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah Arduino");
    }
  },

  deleteArduino: async (req, res) => {
    try {
      const id = req.params.id;

      arduinoModel
        .delete(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menghapus Arduino");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menghapus Arduino");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus Arduino");
    }
  },
  detailWithDevices: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await arduinoModel.getByIdWithDevices(id);
      if (!result) return failed(res, "Not Found", "failed", "Arduino tidak ditemukan");
      success(res, result, "success", "Berhasil mengambil detail Arduino");
    } catch (err) {
      failed(res, err.message, "failed", "Gagal mengambil data Arduino");
    }
  },

  getStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await arduinoModel.getStatusOnly(id);
      if (!result) return failed(res, "Not Found", "failed", "Status tidak ditemukan");
      success(res, result, "success", "Berhasil mengambil status Arduino");
    } catch (err) {
      failed(res, err.message, "failed", "Gagal mengambil status");
    }
  },

  updateStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;
      await arduinoModel.updateStatusOnly(id, status);
      success(res, { id, status }, "success", "Berhasil mengubah status Arduino");
    } catch (err) {
      failed(res, err.message, "failed", "Gagal mengubah status");
    }
  }
};
