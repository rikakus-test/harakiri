const express = require("express");
const {
  getUsers,
  getUserDetail,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const router = express.Router();

router
  .get("/users", getUsers)
  .get("/users/:id", getUserDetail)
  .post("/users", addUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

module.exports = router;
