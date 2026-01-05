const express = require("express");
const router = express.Router();
const { Thread } = require("../models/Thread");
const main = require("../utils/GeminiConfig");
const {
  AllThreads,
  GetThread,
  DeleteThread,
  Chat,
  RenameThread
} = require("../controllers/chat");

router.get("/", async (req, res) => {
  res.render("index.ejs", { message: "API is working" });
});

// get all threads in updatedAt order
router.get("/thread", AllThreads);

// get thread by threadId
router.get("/thread/:threadId", GetThread);

// Delete thread by threadId
router.delete("/thread/:threadId", DeleteThread);

// Rename thread by threadId
router.put("/thread/:threadId", RenameThread)

// create or update thread
router.post("/chat", Chat);

module.exports = router;
