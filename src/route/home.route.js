const express = require("express");
const {
  getHomes,
  getHomeDetail,
  addHome,
  updateHome,
  deleteHome,
} = require("../controllers/home.controller");

const router = express.Router();

router
  .get("/homes", getHomes)
  .get("/homes/:id", getHomeDetail)
  .post("/homes", addHome)
  .put("/homes/:id", updateHome)
  .delete("/homes/:id", deleteHome);

module.exports = router;
