const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sendEmail = require('./sendEmail');

const app = express();
app.use(cors());
app.use(express.json());

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
    res.json(user);
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
app.get('/api/currentUser', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not logged in' });
    }
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(currentUser);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});