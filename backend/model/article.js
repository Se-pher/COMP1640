const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    createdAt: Date,
    facultyName: String,
    author: String,
    avatarURL: String
}, { collection: 'Articles' }, { versionKey: false });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;