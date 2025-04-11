const { register, login } = require('../services/authService');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const {name,email, password, preferences} = req.body
    if(!name || !email || !password || !preferences) {
        return res.status(404).json({message:"Invalid input"})
    }
    const user = await register({name, email, password, preferences});
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const data = await login(req.body);
    //add status code
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { preferences: req.body.preferences },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};