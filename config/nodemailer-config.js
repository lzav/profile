const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const transporter = nodemailer.createTransport({
    service: '***REMOVED***',
    auth: {
<<<<<<< HEAD
      user: keys.nodemailer.user,
      pass: keys.nodemailer.pass
=======
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
>>>>>>> dotenv
    }
  });

module.exports = transporter;