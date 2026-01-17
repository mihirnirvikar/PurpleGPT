const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleware/userAuth");

const { getUserInfo } = require("../controllers/userController");

userRouter.get("/get-user-info", userAuth, getUserInfo);


module.exports = userRouter;