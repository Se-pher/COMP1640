const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sendEmail = require('./sendEmail');
const path = require('path');
const app = express();
const Article= require('./model/article');
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

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  facultyName: String,
});

const User = mongoose.model('User', userSchema);
app.post('/api/users', async (req, res) => {
  const { username, email, password, role, facultyName } = req.body;

  try {
    const newUser = new User({ username, email, password, role, facultyName });
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

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: '1d', 
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateRandomPassword(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

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
    user.password = newPassword;
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

const facultySchema = new mongoose.Schema({
  facultyId: String,
  facultyName: String,
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
  const { facultyId, facultyName } = req.body;

  try {
    const newFaculty = new Faculty({ facultyId, facultyName });
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/faculties/:id', async (req, res) => {
  const { id } = req.params;
  const { facultyId, facultyName } = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { facultyId, facultyName },
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


const authenticateToken = (req, res, next) => {
  const token = req.header['auth-token'];

  if (!token) {
      return res.status(401).json({ message: 'Missing token' });
  }

  try {
      
      const decodedToken = jwt.verify(token, SECRET_KEY);
      console.log('Decoded token:', decodedToken);
      req.user = decodedToken; 
      next();
  } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
  }
};




//ARTICLE
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

    res.json({ username: user.username }); 
  } catch (err) {
    res.status(500).json({ message: 'Invalid token' });
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const articlesRouter = require('./articles');
app.use('/api/articles', articlesRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

// Điều hướng tất cả các yêu cầu khác đến tệp index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
}