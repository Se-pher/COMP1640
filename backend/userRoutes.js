const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  facultyId: { type: Number }
});

const User = mongoose.model('User', userSchema);
const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

module.exports = router;