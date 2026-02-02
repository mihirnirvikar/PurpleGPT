const GoogleGenAI = require("@google/genai").GoogleGenAI;
const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const main = require("./utils/GeminiConfig");
const connectMongoDB = require("./utils/MongoDB");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const { Thread } = require("./models/Thread");
const app = express();
const port = process.env.PORT || 3000;
const chatRouter = require("./routes/chat.js");
const userRouter = require("./routes/userRoutes");
const guestRouter = require("./routes/guestRoutes");


app.use(cors({
  origin: ["http://localhost:5173", "https://purplegpt.netlify.app/", "https://purple-gpt.vercel.app/"]
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
connectMongoDB();


// Routes for chat
app.use("/", chatRouter);

// Routes for auth
app.use("/api/auth", authRouter);

// Routes for user
app.use("/api/user", userRouter);

// Routes for guest user
app.use("/api/guest", guestRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
