const User = require('./userRoutes');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { username, email, password, role, facultyId } = req.body;

  const newUser = new User({
    username,
    email,
    password,
    role,
    facultyId,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};