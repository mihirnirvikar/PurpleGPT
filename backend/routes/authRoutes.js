const express = require("express");
const authRouter = express.Router();
const {register} = require("../controllers/authController")

authRouter.get("/register", register)

module.exports = authRouter