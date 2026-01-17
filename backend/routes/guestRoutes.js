const express = require("express");
const guestRouter = express.Router();
const {
  createGuestSessionId,
  guestChat,
} = require("../controllers/questController");

guestRouter.get("/create-guest-session", createGuestSessionId);
guestRouter.post("/guest-chat", guestChat);

module.exports = guestRouter;
