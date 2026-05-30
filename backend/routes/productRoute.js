import express from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  removeProduct,
} from "../controllers/productController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// ── Public ────────────────────────────────────────────────────────────────────
productRouter.get("/", getProducts);
productRouter.get("/:id", getSingleProduct);

// ── Protected (Admin) ─────────────────────────────────────────────────────────
productRouter.post(
  "/add",
  authAdmin,
  upload.array("image", 5), // up to 5 images per product
  addProduct,
);
productRouter.put("/:id", authAdmin, upload.array("image", 5), updateProduct);
productRouter.delete("/:id", authAdmin, removeProduct);

export default productRouter;
