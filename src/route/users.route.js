const express = require("express");
const {
  getAllUsers,
  getUserDetail,
  addUser,
  updateUser,
  deleteUser,
  bindingHome,
} = require("../controllers/users.controller");

const router = express.Router();

router
  .get("/users", getAllUsers)
  .get("/users/:id", getUserDetail)
  .post("/users", addUser)
  .put("/users", updateUser)
  .delete("/users/:id", deleteUser)
  .put("/binding/:id",  bindingHome)


module.exports = router;
