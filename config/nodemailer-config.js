const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const transporter = nodemailer.createTransport({
    service: '***REMOVED***',
    auth: {
      user: keys.nodemailer.user,
      pass: keys.nodemailer.pass
    }
  });

module.exports = transporter;