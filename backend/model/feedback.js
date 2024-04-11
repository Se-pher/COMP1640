const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    comment: String,
    createdAt: { type: Date, default: Date.now },
    role: String,
    userId: String,
    articleId: String,
  },
  { collection: 'Feedback' },
  { versionKey: false }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;