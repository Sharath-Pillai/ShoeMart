import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
  registerAdmin,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  toggleBlockUser,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";

const userRouter = express.Router();

// ── Public ────────────────────────────────────────────────────────────────────
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin/login", adminLogin);
userRouter.post("/admin/register", registerAdmin);

// ── Protected (User) ──────────────────────────────────────────────────────────
userRouter.get("/profile", authUser, getUserProfile);
userRouter.put("/profile", authUser, updateUserProfile);

// ── Protected (Admin) ─────────────────────────────────────────────────────────
userRouter.get("/all", authAdmin, getAllUsers);
userRouter.delete("/:id", authAdmin, deleteUser);
userRouter.patch("/:id/block", authAdmin, toggleBlockUser);

export default userRouter;
