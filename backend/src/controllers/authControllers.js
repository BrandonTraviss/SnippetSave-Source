import User from "../models/Users.js";
import { generateToken } from "../utils/generateToken.js";
import { validateRegisterInput, validateLoginInput } from "../validators/authValidators.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Backend validation
    const { valid, error } = validateRegisterInput({ username, email, password });
    if (!valid) {
      return res.status(400).json({ error });
    }

    // ✅ Normalize inputs
    const usernameLower = username.toLowerCase();
    const emailLower = email.toLowerCase();

    // ✅ Check username (case-insensitive)
    const usernameExists = await User.findOne({ usernameLower });
    if (usernameExists) {
      return res.status(400).json({ error: "Username is taken" });
    }

    // ✅ Check email (case-insensitive)
    const emailExists = await User.findOne({ emailLower });
    if (emailExists) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // ✅ Create user (await was missing!)
    const user = await User.create({
      username,
      email,
      password,
      usernameLower,
      emailLower,
    });

    // ✅ Generate JWT
    const token = generateToken(user._id);

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in registerUser():", error.message);
    res.status(500).json({ error: "Server error" });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Backend validation
    const { valid, error } = validateLoginInput({ email, password });
    if (!valid) {
      return res.status(400).json({ error });
    }

    const emailLower = email.toLowerCase();

    // ✅ Find user by lowercase email
    const user = await User.findOne({ emailLower }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Generate JWT
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUser():", error.message);
    res.status(500).json({ error: "Server error" });
  }
};



export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};



export const getMe = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        isVerified: req.user.isVerified,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in getMe():", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};