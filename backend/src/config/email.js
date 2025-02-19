const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'shawalkabirchy2020@gmail.com',
    pass: 'xbjyzegrsppzeano'
  }
});

module.exports = transporter;