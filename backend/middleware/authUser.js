import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

/**
 * Middleware: Protects routes for logged-in users.
 * Expects  Authorization: Bearer <token>  header.
 * Also enforces the isBlocked flag — blocked users are rejected even with a valid token.
 */
const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized. Login again." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    // ── Block check: load user and reject if blocked ──────────────────────────
    const user = await userModel.findById(decoded.id).select("isBlocked");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found. Login again." });
    }
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support.",
        blocked: true,
      });
    }

    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token invalid or expired." });
  }
};

export default authUser;
