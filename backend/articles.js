const express = require('express');
const router = express.Router();
const Article = require('./model/article');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401); // Không có token
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Token không hợp lệ
    req.user = user; // Lưu thông tin giải mã vào req.user
    next(); // Tiếp tục middleware tiếp theo
  });
};

router.post('/', verifyToken, async (req, res) => {
  const { title, description, imageURL, wordFileURL, facultyName } = req.body;
  
  try {
    // Lưu article với userId từ token đã được xác thực
    const newArticle = new Article({
      title,
      description,
      imageURL,
      wordFileURL,
      facultyName,
      userId: req.user.userId,
      createdAt: new Date(),
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




module.exports = router;