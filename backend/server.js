const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sendEmail = require('./sendEmail');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Article = require('./model/article');
const bcrypt = require('bcrypt');
const User = require('./model/user');
const Feedback = require('./model/feedback');
const Faculty = require('./model/faculty');
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';
mongoose.connect('mongodb+srv://COMP1640:COMP1640group5@comp1640.x6wcpq8.mongodb.net/COMP1640?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.post('/api/users', async (req, res) => {
  const { username, email, password, role, facultyName } = req.body;

  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ username, email, password: hashedPassword, role, facultyName });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role, facultyName } = req.body;

  try {
    const updatedFields = {};
    
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }
    if (role) updatedFields.role = role;
    if (facultyName) updatedFields.facultyName = facultyName;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role, facultyName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        username, 
        email, 
        password: hashedPassword, 
        role, 
        facultyName 
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Login 

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: '1d',
    });

    res.json({ user: { email: user.email, role: user.role }, token }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; 
    next(); 
  });
};

function generateRandomPassword(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }``

  return password;
}

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword; 
    await user.save();

    const subject = 'Reset Password';
    const text = `Your new password is: ${newPassword}`;
    await sendEmail(email, subject, text);

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error in /api/forgot-password:', err);
    res.status(500).json({ message: 'Error sending password reset email' });
  }
});


//FACULTY

app.get('/api/faculties', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/faculties', async (req, res) => {
  const { facultyName, facultyDeadline } = req.body;

  try {
    const existingFaculty = await Faculty.findOne({ facultyName });
    if (existingFaculty) {
      return res.status(400).json({ message: 'A faculty with this name already exists.' });
    }

    const newFaculty = new Faculty({ facultyName, facultyDeadline });
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/faculties/:id', async (req, res) => {
  const { id } = req.params;
  const {facultyName, facultyDeadline } = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { facultyName, facultyDeadline },
      { new: true }
    );
    res.json(updatedFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/faculties/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Faculty.findByIdAndDelete(id);
    res.json({ message: 'Faculty deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



//ARTICLE
app.post('/api/articles', verifyToken, async (req, res) => {
  const { title, description, imageURL, wordFileURL, facultyName } = req.body;
  try {
    const userId = req.user.userId;
    const newArticle = new Article({ title, description, imageURL, wordFileURL, facultyName, userId });
    await newArticle.save();
    const coordinators = await User.find({ role: 'Coordinator', facultyName});
    for (const coordinator of coordinators) {
      await sendEmail(coordinator.email, 'New article uploaded', `A new article has been uploaded for the ${facultyName} faculty.`);
    }
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/articles/:id/public', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    const newStatus = article.status === 'public' ? 'lock' : 'public';
    
    const updatedArticle = await Article.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/articles/:id', verifyToken, async (req, res) => {
  const { title, description, imageURL, wordFileURL, facultyName } = req.body;
  const { id } = req.params;
  try {
    const userId = req.user.userId;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (article.userId !== userId) {
      return res.status(403).json({ message: "You are not authorized to edit this article" });
    }
    article.title = title;
    article.description = description;
    article.imageURL = imageURL;
    article.wordFileURL = wordFileURL;
    article.facultyName = facultyName;
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//TOKEN

app.get('/api/decode-token', async (req, res) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username, facultyName: user.facultyName, userrole: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Invalid token' });
  }
});

app.get('/api/user/articles', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const articles = await Article.find({ userId });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put('/api/user/decode-update', async (req, res) => {
  const { username, email, currentPassword, newPassword } = req.body;

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token không được cung cấp' });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);
    console.log(decoded.userId)
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu hiện tại không chính xác' });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }
    await user.save();
    res.json({
      username: user.username,
      email: user.email,
      message: 'Thông tin người dùng và mật khẩu đã được cập nhật'
    });
  } catch (err) {
    res.status(500).json({ message: 'Token không hợp lệ hoặc lỗi server' });
  }
});


//Profile
app.get('/api/user/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; 

  try {

    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.put('/api/user/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; 
  const { name, email, password, currentPassword } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    if (name) user.username = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const articlesRouter = require('./articles');
app.use('/api/articles', articlesRouter);

app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    const user = await User.findById(article.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const faculty = await Faculty.findOne({ facultyName: article.facultyName });
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json({ article, username: user.username, facultyDeadline: faculty.facultyDeadline,status: article.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/articlesFaculty', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; 
    const user = await User.findById(userId); 
    if (!user) return res.status(404).json({ message: "User not found" });

    const facultyName = user.facultyName; 
    const articles = await Article.find({ facultyName: facultyName, status: 'public' }); 
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



const admin = require('firebase-admin');

const serviceAccount = require('./comp1640cloud-firebase-adminsdk-m472w-c63147a365.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'comp1640cloud.appspot.com'
});

const bucket = admin.storage().bucket();

app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const imagePath = `images/${file.originalname}`;

    await bucket.upload(file.path, {
      destination: imagePath,
    });

    const blob = bucket.file(imagePath);

    const [imageUrl] = await blob.getSignedUrl({
      action: 'read',
      expires: '03-17-2025',
    });

    res.json({ secure_url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});


app.post('/api/wordFiles', upload.single('wordFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileType =
      fileExtension === '.doc'
        ? 'application/msword'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    const wordFilePath = `wordFiles/${file.originalname}`;

    await bucket.upload(file.path, {
      destination: wordFilePath,
      metadata: {
        contentType: fileType,
      },
    });

    const blob = bucket.file(wordFilePath);

    const [fileURL] = await blob.getSignedUrl({
      action: 'read',
      expires: '03-17-2025',
    });

    res.json({ fileURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});


//Feedback
app.get('/api/feedbacks/:articleId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ articleId: req.params.articleId });
    res.json({ feedbacks });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/feedbacks', async (req, res) => {
  try {
    const { comment, articleId, username } = req.body;
    const newFeedback = new Feedback({ comment, articleId, username });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/articles/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.userId;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (article.userId !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this article" });
    }
    await Article.findByIdAndDelete(id);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});