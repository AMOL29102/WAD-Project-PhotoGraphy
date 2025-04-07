
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectUserRoutes = async (req, res, next) => {
  let token;

  console.log("==== Incoming Request ====");
  console.log("Authorization Header:", req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("Extracted Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      console.log("Decoded Token:", decoded);

      const user = await User.findById(decoded.id).select('-password');
      console.log("Found User:", user);

      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log("JWT verification error:", error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log("No valid token in header");
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectAdminRoutes = async (req, res, next) => {
  let token;

  console.log("Request headers:", req.headers);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      const user = await User.findById(decoded.id).select('-password');

      if (!user || user.isAdmin === false) {
        return res.status(403).json({ message: 'Not authorized, admin access only' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protectAdminRoutes , protectUserRoutes};