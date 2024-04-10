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
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';
mongoose.connect('mongodb+srv://COMP1640:COMP1640group5@cluster0.kgdq0tl.mongodb.net/COMP1640?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


//USER
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  facultyName: String,
});
const User = mongoose.model('User', userSchema);
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
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, role, facultyName },
      { new: true }
    );
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
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, role, facultyName },
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

    // So sánh mật khẩu đầu vào với mật khẩu đã mã hóa trong DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Tạo token
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

  if (!token) return res.sendStatus(401); // Không có token

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Token không hợp lệ
    req.user = user; // Lưu thông tin giải mã vào req.user
    next(); // Tiếp tục middleware tiếp theo
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
const facultySchema = new mongoose.Schema({
  facultyId: String,
  facultyName: String,
  facultyDeadline: Date,
});

const Faculty = mongoose.model('Faculty', facultySchema);
app.get('/api/faculties', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/faculties', async (req, res) => {
  const { facultyId, facultyName, facultyDeadline } = req.body;

  try {
    const newFaculty = new Faculty({ facultyId, facultyName, facultyDeadline });
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/faculties/:id', async (req, res) => {
  const { id } = req.params;
  const { facultyId, facultyName, facultyDeadline } = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { facultyId, facultyName, facultyDeadline },
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
    // Lấy userId từ thông tin người dùng được giải mã từ token
    const userId = req.user.userId;

    // Tạo bài viết mới với userId đã xác định
    const newArticle = new Article({ title, description, imageURL, wordFileURL, facultyName, userId });
    await newArticle.save();

    // Kiểm tra xem faculty của bài viết có khớp với faculty của user có role là coordinator hay không
    const coordinatorUser = await User.findOne({ role: 'coordinator', facultyName });
    if (coordinatorUser) {
      // Gửi email thông báo tới coordinator
      await sendEmail(coordinatorUser.email, 'New article uploaded', `A new article has been uploaded for the ${facultyName} faculty.`);
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
  const { name, email, password } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
    res.json({ article, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/articlesFaculty', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy userId từ req.user được thêm bởi middleware verifyToken
    const user = await User.findById(userId); // Lấy thông tin user dựa trên userId từ token
    if (!user) return res.status(404).json({ message: "User not found" });

    const facultyName = user.facultyName; // Lấy facultyName từ thông tin user

    const articles = await Article.find({ facultyName: facultyName }); // Lấy danh sách bài báo dựa trên facultyName
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const admin = require('firebase-admin');

const serviceAccount = require('./comp1640clound-firebase-adminsdk-8bb7x-be325de63f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'comp1640clound.appspot.com'
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
