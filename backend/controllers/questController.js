const { v4: uuidv4 } = require("uuid");
const redisClient = require("../utils/redis");
const main = require("../utils/GeminiConfig");

const createGuestSessionId = async (req, res) => {
  const guestSessionId = uuidv4();

  res.cookie("guestSessionId", guestSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return res.status(200).json({
    message: "Guest session created successfully",
    guestSessionId,
    remainingMessages: 11,
  });
};

const guestChat = async (req, res) => {
  const { threadId, message } = req.body;
  const guestSessionId = req.cookies.guestSessionId;

  if (!guestSessionId) {
    return res.status(400).json({ message: "Guest session not found" });
  }

  if (!threadId || !message) {
    return res.status(400).json({ message: "Thread and message are required" });
  }

  try {
    const limitKey = `guest:limit:${guestSessionId}`;
    const count = await redisClient.incr(limitKey);

    if (count === 1) {
      await redisClient.expire(limitKey, 86400);
    }

    if (count > 10) {
      return res.status(403).json({
        message:
          "You have reached the limit of 10 messages per day. Please login to continue.",
      });
    }

    const threadKey = `guest:thread:${guestSessionId}:${threadId}`;
    const rawThread = await redisClient.get(threadKey);

    let thread = rawThread
      ? JSON.parse(rawThread)
      : {
          threadId,
          title: message,
          messages: [],
        };

    thread.messages.push({
      role: "user",
      content: message,
    });

    const assistantResponse = await main(message);
    const aiResponse =
      assistantResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't respond.";

    thread.messages.push({
      role: "assistant",
      content: aiResponse,
    });

    await redisClient.set(threadKey, JSON.stringify(thread), {
      EX: 86400,
    });

    return res.status(200).json({
      resp: aiResponse,
      remainingMessages: 11 - count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createGuestSessionId,
  guestChat,
};
