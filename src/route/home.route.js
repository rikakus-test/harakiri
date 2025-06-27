const express = require("express");
const {
  getAllHomes,
  getHomeDetail,
  addHome,
  updateHome,
  deleteHome,
  detailWithRelations,
} = require("../controllers/home.controller");

const router = express.Router();

router
  .get("/home", getAllHomes)
  .get("/home/:id", getHomeDetail)
  .post("/home", addHome)
  .put("/home", updateHome)
  .delete("/home/:id", deleteHome)
  .get("/home/expanded/:id", detailWithRelations)


module.exports = router;
