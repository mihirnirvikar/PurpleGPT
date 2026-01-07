const express = require("express");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
  refreshAccessToken,
  sendVerifyOtp,
  verifyOtp,
  sendResetOtp,
  resetPassword,
} = require("../controllers/authController");
const userAuth = require("../middleware/userAuth");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", userAuth);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-otp", userAuth, verifyOtp);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
