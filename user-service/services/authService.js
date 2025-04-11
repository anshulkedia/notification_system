const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async ({ name, email, password, preferences }) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, preferences });
  await user.save();
  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return { token, user };
};

module.exports = { register, login };