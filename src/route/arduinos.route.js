const express = require("express");
const {
  getArduinos,
  getArduinoDetail,
  addArduino,
  updateArduino,
  deleteArduino,
} = require("../controllers/arduinos.controller");

const router = express.Router();

router
  .get("/arduinos", getArduinos)
  .get("/arduinos/:id", getArduinoDetail)
  .post("/arduinos", addArduino)
  .put("/arduinos/:id", updateArduino)
  .delete("/arduinos/:id", deleteArduino);

module.exports = router;
