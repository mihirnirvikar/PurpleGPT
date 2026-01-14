const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/userAuth");

const { getUserInfo } = require("../controllers/userController");

router.get("/get-user-info", userAuth, getUserInfo);


module.exports = router;