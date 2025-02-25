const express = require("express");
const {items,
  addItems,
  itemStatus

} = require("../controllers/test.controller");

const router = express.Router();

router
  .get("/items", items)
  .post("/items", addItems)
  .put("/itemstatus/:id", itemStatus)

module.exports = router;
