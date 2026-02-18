const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config();

// For production, use a service like Gmail, Outlook, or SendGrid
const transporter = nodemailer.createTransport({
  service: process.env.NODE_ENV === 'production' ? 'gmail' : undefined,
  host: process.env.NODE_ENV === 'production' ? undefined : process.env.SMTP_HOST,
  port: process.env.NODE_ENV === 'production' ? 587 : process.env.SMTP_PORT,
  secure: process.env.NODE_ENV === 'production' ? false : false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // Add debug and logger for troubleshooting
  debug: process.env.NODE_ENV !== 'production',
  // logger: true
});

module.exports = transporter;
