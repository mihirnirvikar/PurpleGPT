const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleware/userAuth");

const { getUserInfo, sendMessage } = require("../controllers/userController");

userRouter.get("/get-user-info", userAuth, getUserInfo);
userRouter.post("/send-message", sendMessage);

module.exports = userRouter;