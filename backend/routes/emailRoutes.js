const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const EmailRequest = require('../models/EmailRequest'); // Assuming you have an EmailRequest model for MongoDB or any other DB

// POST: Send email via SMTP
router.post('/send-email', async (req, res) => {
  const { host, port, username, password, to, subject, text } = req.body;

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: username, // sender address
      to,             // recipient address
      subject,        // subject line
      text,           // plain text body
    });

    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email', error });
  }
});

// POST: Store email request in database
router.post('/store-email', async (req, res) => {
  const { requirement, username, email, phone } = req.body;

  try {
    // Create and save a new email request in the database
    const emailRequest = new EmailRequest({
      requirement,
      username,
      email,
      phone,
    });

    await emailRequest.save();
    res.status(200).send({ message: 'Email request saved successfully' });
  } catch (error) {
    console.error('Error saving email request:', error);
    res.status(500).send({ message: 'Failed to save email request', error });
  }
});

module.exports = router;
