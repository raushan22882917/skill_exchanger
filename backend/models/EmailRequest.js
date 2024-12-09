const mongoose = require('mongoose');

const emailRequestSchema = new mongoose.Schema({
  requirement: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, {
  timestamps: true, // to track when the email request is created
});

const EmailRequest = mongoose.model('EmailRequest', emailRequestSchema);

module.exports = EmailRequest;
