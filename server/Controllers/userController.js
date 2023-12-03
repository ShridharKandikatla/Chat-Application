const UserModel = require('../Models/userModel');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../Utils/generateToken');

const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const user = await UserModel.findOne({ name });
  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  if ((await UserModel.findOne({ email })) !== null) {
    return res.status(430).send({ message: 'Email already exists' });
  }

  if ((await UserModel.findOne({ name })) !== null) {
    return res.status(431).send({ message: 'username already exists' });
  }

  const newUser = new UserModel({
    name,
    email,
    password,
  });
  const savedUser = await newUser.save();
  if (savedUser) {
    res.send({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      token: generateToken(savedUser._id),
    });
  } else {
    res.status(400).send({ message: 'Invalid user data' });
  }
});

const fetchAllUser = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};
  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = {
  loginController,
  registerController,
  fetchAllUser,
};
