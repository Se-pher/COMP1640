const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB
mongoose.connect('mongodb+srv://COMP1640:COMP1640group5@cluster0.kgdq0tl.mongodb.net/COMP1640?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Định nghĩa schema và model cho User
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  facultyId: String,
});

const User = mongoose.model('User', userSchema);

// API endpoint để thêm user mới
app.post('/api/users', async (req, res) => {
  const { username, email, password, role, facultyId } = req.body;

  try {
    const newUser = new User({ username, email, password, role, facultyId });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API endpoint để lấy danh sách user
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm kiếm người dùng trong database theo email và password
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Xác thực thành công, trả về thông tin người dùng
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Khởi chạy server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});