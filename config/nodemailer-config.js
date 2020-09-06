const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: process.env.NODEMAILER_SERVICE,
//     auth: {
//       user: process.env.NODEMAILER_USER,
//       pass: process.env.NODEMAILER_PASS
//     }
//   });

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

module.exports = transporter;