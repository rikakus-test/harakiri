const express = require("express");
const {items,
  addItems,
  updateItems,
  deleteItems,
  itemsDetail

} = require("../controllers/device.controller");

const router = express.Router();

router
  .get("/device", items)
  .get("/device/:id", itemsDetail)
  .post("/device", addItems)
  .put("/device", updateItems)
  .delete("/device/:id", deleteItems)


module.exports = router;
