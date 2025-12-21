const express = require("express");
const router = express.Router();
const { Thread } = require("../models/Thread");
const main = require("../utils/GeminiConfig");

router.get("/", async (req, res) => {
  res.render("index.ejs", { message: "API is working" });
});

router.get("/thread", async (req, res) => {
  try {
    const thread = await Thread.find({}).sort({ updatedAt: -1 });

    res.json(thread);
  } catch (error) {
    console.log(error);
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const threadId = req.params.threadId;
  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const threadId = req.params.threadId;
  try {
    const result = await Thread.deleteOne({ threadId });
    if (!result) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Thread or message is missing" });
  }

  try {
    let thread = await Thread.findOne({ threadId });
    console.log(thread)
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      thread.messages.push({
        role: "user",
        content: message,
      });
    }

    const assistantResponse = await main(message);
    const aiResponse = assistantResponse.candidates[0].content.parts[0].text;
    thread.messages.push({
      role: "assistant",
      content: aiResponse,
    });
    thread.updatedAt = new Date();

    const result = await thread.save();
    res.status(200).json({ res: result, resp: assistantResponse });
  } catch (error) {
    console.log(error);
  }
});



// router.post("/test", async(req, res) => {
//     const que = "what is the capital of india";
//     const response = await main(que);
//     res.json(response);
// })

module.exports = router;
