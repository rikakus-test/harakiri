const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const arduinosModel = require("../models/arduinos.model");

module.exports = {
  getArduinos: async (req, res) => {
    try {
      const result = await arduinosModel.getAll();
      success(res, result, "success", "Berhasil Mendapatkan Data Arduino");
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Data Arduino");
    }
  },

  getArduinoDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await arduinosModel.getById(id);
      success(res, result, "success", "Berhasil Mendapatkan Detail Arduino");
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Detail Arduino");
    }
  },

  addArduino: async (req, res) => {
    try {
      const { ip, login, password, arduino_name, status } = req.body;
      const arduino_id = uuidv4();
      const result = await arduinosModel.add({
        arduino_id,
        ip,
        login,
        password,
        arduino_name,
        status,
      });
      success(
        res,
        { ...result, arduino_id },
        "success",
        "Berhasil Menambah Arduino"
      );
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambah Arduino");
    }
  },

  updateArduino: async (req, res) => {
    try {
      const arduino_id = req.params.id;
      const { ip, login, password, arduino_name, status } = req.body;
      const result = await arduinosModel.update({
        arduino_id,
        ip,
        login,
        password,
        arduino_name,
        status,
      });
      success(
        res,
        { ...result, arduino_id },
        "success",
        "Berhasil Mengubah Arduino"
      );
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah Arduino");
    }
  },

  deleteArduino: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await arduinosModel.remove(id);
      success(res, { ...result, id }, "success", "Berhasil Menghapus Arduino");
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus Arduino");
    }
  },
};
