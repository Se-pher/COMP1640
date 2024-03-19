const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/currentUser', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not logged in' });
    }
    const currentUser = await User.findById(req.user.username);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(currentUser);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
