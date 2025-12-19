const GoogleGenAI = require("@google/genai").GoogleGenAI;
const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const main = require("./utils/GeminiConfig");
const mongoose = require("mongoose");
const { Thread } = require("./models/Thread");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


async function connectMongo() {
  try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectMongo();

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/test", (req, res) => {
  // res.send("API is working");
  res.render("index.ejs", {message: "API is working"});
});

app.post("/test", async (req, res) => {
  const que = req.body.ques;
  console.log(que);
  
  const thread = new Thread({
    threadId: "test1",
    title: "test1",
    messages: [
      {
        role: "user",
        content: "question1",
      }
    ]
  })

  const result = await thread.save();
  console.log(result)
  res.redirect("/test");

  // const response = await main(que);
  // console.log(response.candidates[0].content.parts[0].text);
  // res.render("index.ejs", {message: response.candidates[0].content.parts[0].text});
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
