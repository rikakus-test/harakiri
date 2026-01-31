const express = require("express");
const {
  getAllUsers,
  getUserDetail,
  addUser,
  updateUser,
  deleteUser,
  bindingHome,
  login,
  register
} = require("../controllers/users.controller");

const router = express.Router();

router
  .get("/users", getAllUsers)
  .get("/users/:id", getUserDetail)
  .post("/users", addUser)
  .put("/users", updateUser)
  .delete("/users/:id", deleteUser)
  .put("/binding/:id", bindingHome)
  .post("/login", login)
  .post("/register", register);


module.exports = router;
