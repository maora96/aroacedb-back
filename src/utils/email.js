const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
};
//
const transport = nodemailer.createTransport(config);

const sendEmail = async (from, to, subject, html) => {
  transport.sendMail({
    from,
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };
