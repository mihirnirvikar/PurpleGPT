const { v4: uuidv4 } = require("uuid");
const redisClient = require("../utils/redis");

const createGuestSessionId = async (req, res) => {
  const guestSessionId = uuidv4();

  res.cookie("guestSessionId", guestSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return res
    .status(200)
    .json({
      message: "Guest session created successfully",
      guestSessionId,
      remainingMessages: 5,
    });
};



module.exports = {
  createGuestSessionId,
};
