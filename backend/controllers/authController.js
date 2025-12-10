const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ==================
// Register User
// ==================
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // Clean user object before sending
    const cleanUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    };

    res.status(201).json({
      token: generateToken(user._id),
      user: cleanUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

// ==================
// Login User
// ==================
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("login")

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Clean user object before sending
    const cleanUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    };

    res.status(200).json({
      token: generateToken(user._id),
      user: cleanUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in user",
      error: err.message,
    });
  }
};

// ==================
// Get Authenticated User Info
// ==================
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error getting user info",
      error: err.message,
    });
  }
};

// ==================
// Change Password
// ==================
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error updating password",
      error: err.message,
    });
  }
};
