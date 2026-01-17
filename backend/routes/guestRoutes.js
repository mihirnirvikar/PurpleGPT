const express = require("express");
const guestRouter = express.Router();
const { createGuestSessionId } = require("../controllers/questController");

guestRouter.get("/create-guest-session", createGuestSessionId);

module.exports = guestRouter;
