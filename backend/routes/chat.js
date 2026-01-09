const express = require("express");
const router = express.Router();
const {
  AllThreads,
  GetThread,
  DeleteThread,
  Chat,
  RenameThread
} = require("../controllers/chat");
const userAuth = require("../middleware/userAuth");

// get all threads in updatedAt order
router.get("/threads", userAuth, AllThreads);

// get thread by threadId
router.get("/threads/:threadId", userAuth, GetThread);

// Delete thread by threadId
router.delete("/threads/:threadId", userAuth, DeleteThread);

// Rename thread by threadId
router.put("/threads/:threadId", userAuth, RenameThread)

// create or update thread
router.post("/chat", userAuth, Chat);

module.exports = router;
