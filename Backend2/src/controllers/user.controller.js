
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, mobile, password } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({ message: "Email or Mobile is required" });
    }

    // Prepare query dynamically
    let query = {};
    if (email) query.email = email.toLowerCase();
    if (mobile) query.mobile = mobile;

    // Check if user exists
    const existingUser = await User.findOne(query);

    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      email: email ? email.toLowerCase() : undefined,
      mobile,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { identifier, password, isAdmin } = req.body;

    console.log("Login attempt:", { identifier, isAdmin });

    // Build base query
    const query = {
      $or: [{ email: identifier }, { mobile: identifier }],
    };

    if (isAdmin) {
      query.isAdmin = true; // Only fetch admins if isAdmin checkbox is ticked
    }

    const user = await User.findOne(query);
    console.log("Found user:", user);



    if (user && (await user.matchPassword(password)) && user.isAdmin === isAdmin) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isAdmin: isAdmin?(user.isAdmin):false,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials or role" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, createUser, loginUser };
