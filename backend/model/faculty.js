const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    facultyName: String,
    facultyDeadline: Date,
  });
  const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;