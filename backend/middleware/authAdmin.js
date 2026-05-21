import jwt from "jsonwebtoken";

/**
 * Middleware: Protects admin-only routes.
 * Expects  Authorization: Bearer <token>  header.
 * The token must contain role: "admin".
 */
const authAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized. Admin login required." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    req.adminId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token invalid or expired." });
  }
};

export default authAdmin;
