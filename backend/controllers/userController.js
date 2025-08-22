import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc   Register new user
// @route  POST /api/users/register
// @access Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({ name, email, password });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (e) {
    console.error("Register Error:", e.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc   Login user
// @route  POST /api/users/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (e) {
    console.error("Login Error:", e.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (e) {
    console.error("Profile Error:", e.message);
    return res.status(500).json({ message: "Server error" });
  }
};
