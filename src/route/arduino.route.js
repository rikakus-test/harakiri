const express = require("express");
const {
  getAllArduino,
  getArduinoDetail,
  addArduino,
  updateArduino,
  deleteArduino,
  detailWithDevices,
  getStatus,
  updateStatus,
} = require("../controllers/arduino.controller");

const router = express.Router();

router
  .get("/arduino", getAllArduino)
  .get("/arduino/:id", getArduinoDetail)
  .post("/arduino", addArduino)
  .put("/arduino", updateArduino)
  .delete("/arduino/:id", deleteArduino)
  .get("/arduino/expanded/:id", detailWithDevices)
  .get("/arduino/status/:id", getStatus)
  .put("/arduino/status/:id", updateStatus)

module.exports = router;
