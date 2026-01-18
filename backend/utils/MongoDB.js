const mongoose = require("mongoose");
async function connectMongoDB() {
  try{
    await mongoose.connect(process.env.MONGODB_ATLAS_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectMongoDB;