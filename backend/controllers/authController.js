const UserModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken.js");
const dotenv = require("dotenv").config();
const transporter = require("../utils/nodemailer");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = await new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // generate access token and refresh token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // save the refresh token to the user document
    user.refreshToken = refreshToken;

    // save the user
    const result = await user.save();
    console.log(result);

    // Refresh token saves in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // send welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to PurpleGPT",
      text: `Hi ${name},\n\nWelcome to PurpleGPT! We're excited to have you join our community.\n\nBest,\nPurpleGPT Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({error: "All fields are required"});
  }

  try {
    const user = await UserModel.findOne({email});

    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
      return res.status(401).json({error: "Invalid credentials"});
    }

    // generate access and refresh token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // save refresh token to user 
    user.refreshToken = refreshToken;
    await user.save();

    // save refresh token to cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // send welcome back mail
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome back to PurpleGPT",
      text: `Hi ${user.name},\n\nWelcome back to PurpleGPT! We're glad you're back.\n\nBest,\nPurpleGPT Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      accessToken,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
}

const logout = async(req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    })

    return res.status(200).json({message: "User logged out successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal Server Error"});
  }
}

module.exports = { register, login, logout };
