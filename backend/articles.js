const express = require('express');
const router = express.Router();
const Article = require('./model/article');

router.post('/', async (req, res) => {
    const { title, description, content, createdAt, facultyName, author, avatarURL } = req.body;

    try {
        const newArticle = new Article({
            title,
            description,
            content,
            createdAt,
            facultyName,
            author,
            avatarURL
        });
        await newArticle.save();

        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;