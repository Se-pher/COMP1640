const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    comment: String,
    createdAt: { type: Date, default: Date.now },
    role: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    articleId: String,
    username: String,
  },
  { collection: 'Feedback' },
  { versionKey: false }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;