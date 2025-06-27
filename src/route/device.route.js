const express = require("express");
const {items,
  addItems,
  updateItems,
  deleteItems,
  itemsDetail

} = require("../controllers/device.controller");

const router = express.Router();

router
  .get("/items", items)
  .get("/items/:id", itemsDetail)
  .post("/items", addItems)
  .put("/itemstatus/:id", updateItems)
  .delete("/items/:id", deleteItems)


module.exports = router;
