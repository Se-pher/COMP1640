const express = require('express');
const router = express.Router();
const Image = require('./model/image');

router.post('/', async (req, res) => {
    const { imageUrl, description, contributionId } = req.body;

    try {
        const newImage = new Image({
            imageUrl,
            description,
            contributionId
        });
        await newImage.save();

        res.status(201).json(newImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;