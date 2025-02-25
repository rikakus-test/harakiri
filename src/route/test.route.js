const express = require("express");
const {items,
  addItems,
  itemStatus,
  deleteItems,
  itemsDetail

} = require("../controllers/test.controller");

const router = express.Router();

router
  .get("/items", items)
  .get("/items/:id", itemsDetail)
  .post("/items", addItems)
  .put("/itemstatus/:id", itemStatus)
  .delete("/items/:id", deleteItems)


module.exports = router;
