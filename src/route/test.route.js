const express = require("express");
const {items,
  addItems

} = require("../controllers/test.controller");

const router = express.Router();

router
  .get("/items", items)
  .post("/items", addItems)

module.exports = router;
