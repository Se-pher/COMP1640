const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'tannguyentest23@gmail.com',
      pass: 'dlatlokyaprdhhjo'
    }
  });

const sendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'tannguyentest23@gmail.com',
      to: email,
      subject: subject,
      text: text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;