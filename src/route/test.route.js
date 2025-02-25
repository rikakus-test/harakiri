const express = require("express");
const {items,
  addItems,
  itemStatus,
  deleteItems

} = require("../controllers/test.controller");

const router = express.Router();

router
  .get("/items", items)
  .post("/items", addItems)
  .put("/itemstatus/:id", itemStatus)
  .delete("/items/:id", deleteItems)


module.exports = router;
