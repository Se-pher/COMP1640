const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageURL: String,
    wordFileURL: String,
    createdAt: { type: Date, default: Date.now },
    facultyName: String,
    userId: String,
    status: { type: String, default: 'lock' }
  },
  { collection: 'Articles' },
  { versionKey: false }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;