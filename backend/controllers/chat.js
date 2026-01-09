const { Thread } = require("../models/Thread");
const main = require("../utils/GeminiConfig");

// get all threads in updatedAt order
const AllThreads = async (req, res) => {
  try {
    const thread = await Thread.find({ userId: req.user.userId }).sort({
      updatedAt: -1,
    });

    res.json(thread);
  } catch (error) {
    console.log(error);
  }
};

// get thread by threadId
const GetThread = async (req, res) => {
  const threadId = req.params.threadId;
  try {
    const thread = await Thread.findOne({ threadId, userId: req.user.userId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread);
  } catch (error) {
    console.log(error);
  }
};

const DeleteThread = async (req, res) => {
  const threadId = req.params.threadId;
  try {
    const result = await Thread.deleteOne({
      threadId,
      userId: req.user.userId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

// create or update thread
const Chat = async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Thread or message is missing" });
  }

  try {
    let thread = await Thread.findOne({ threadId, userId: req.user.userId });
    if (!thread) {
      thread = new Thread({
        userId: req.user.userId,
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
    const aiResponse = assistantResponse.candidates[0]?.content?.parts[0]?.text;
    thread.messages.push({
      role: "assistant",
      content: aiResponse,
    });
    thread.updatedAt = new Date();

    const result = await thread.save();
    res
      .status(200)
      .json({ resp: assistantResponse?.candidates[0]?.content.parts[0]?.text });
  } catch (error) {
    console.log(error);
  }
};

const RenameThread = async (req, res) => {
  const threadId = req.params.threadId;
  const { newTitle } = req.body;
  if (!threadId || !newTitle) {
    return res
      .status(404)
      .json({ error: "Invalid ThreadId or Title name is missing" });
  }

  try {
    const thread = await Thread.findOne({ threadId, userId: req.user.userId });
    if (!thread) {
      return res.status(404).json({ error: "Thread Not Found" });
    }

    thread.title = newTitle;
    await thread.save();
    
    return res.status(200).json({ message: "Thread renamed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  AllThreads,
  GetThread,
  DeleteThread,
  Chat,
  RenameThread,
};
