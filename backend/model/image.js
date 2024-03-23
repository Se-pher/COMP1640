const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: String,
    description: String,
    contributionId: String
}, { collection: 'Images' }, { versionKey: false });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
