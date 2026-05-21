import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

// Helper: generate JWT
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ─── Register(common for admin & user) ───────────────────────────────────────────────────────────────
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address." });

    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });

    const exists = await userModel.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashed });
    await user.save();

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── User Login ───────────────────────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required." });

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    // ── Block check ──────────────────────────────────────────────────────────
    if (user.isBlocked)
      return res
        .status(403)
        .json({ success: false, message: "Your account has been blocked. Please contact support." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    const token = generateToken(user._id, user.role);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin Login ─────────────────────────────────────────────────────────────
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    )
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials." });

    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      token,
      user: {
        id: email,
        name: "Admin",
        email: email,
        role: "admin",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Profile ─────────────────────────────────────────────────────────────
export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Profile ───────────────────────────────────────────────────────────
export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await userModel
      .findByIdAndUpdate(
        req.userId,
        { name, phone, address },
        { new: true, runValidators: true },
      )
      .select("-password");
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get All Users (Admin) ────────────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Delete User (Admin) ──────────────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Toggle Block User (Admin) ────────────────────────────────────────────────
export const toggleBlockUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ success: true, message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully.`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// ─── Register Admin (with invitation code) ──────────────────────────────────
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, invitationCode } = req.body;

    if (!name || !email || !password || !invitationCode)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    // Verify invitation code
    if (invitationCode !== process.env.ADMIN_INVITATION_CODE)
      return res
        .status(403)
        .json({ success: false, message: "Invalid invitation code." });

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address." });

    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });

    const exists = await userModel.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashed,
      role: "admin",
    });
    await user.save();

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
