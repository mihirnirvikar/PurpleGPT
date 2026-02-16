const UserModel = require("../models/authModel");
const transporter = require("../utils/nodemailer");

const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userDetails = {
      name: user.name,
      email: user.email,
      isAccountVerified: user.isAccountVerified,
    };

    return res.status(200).json({
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // send mail to user
    const mailSender = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Message sent successfully",
      text:
        `Hi ${name},\n\n\nYour message has been received. We will get back to you soon,\n` +
        `Best,\nMihir Nirvikar`,
    };

    transporter.sendMail(mailSender).catch(console.error);

    // send mail to admin
    const mailReceiver = {
      from: process.env.SENDER_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: "Message receive from " + name,
      text: `Hi, I'm ${name} (${email})\n\n\n${message}\n\nBest,\n${name}`,
    };

    transporter.sendMail(mailReceiver).catch(console.error);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUserInfo,
  sendMessage,
};
