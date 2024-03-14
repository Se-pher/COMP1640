const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      res.redirect('/forgot-password');
    } else {
      res.status(401).json({ message: 'Đăng nhập không thành công', token: 'your_auth_token' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi máy chủ'});
  }
});

module.exports = router;
