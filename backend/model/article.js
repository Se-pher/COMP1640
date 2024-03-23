const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    content: String,
    wordCount: Number,
    contributionId: String
}, { collection: 'Articles' }, { versionKey: false });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;