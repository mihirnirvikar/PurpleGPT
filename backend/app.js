const GoogleGenAI = require("@google/genai").GoogleGenAI;
const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const main = require("./utils/GeminiConfig");
const connectMongoDB = require("./utils/MongoDB");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const { Thread } = require("./models/Thread");
const app = express();
const port = 3000;
const chatRouter = require("./routes/chat.js");

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  withCredentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


connectMongoDB();

// Routes for chat
app.use("/", chatRouter);

// Routes for auth
app.use("/api/auth", authRouter)



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
