import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Route imports
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// ── App Config ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 4000;

// ── DB & Cloud Connections ────────────────────────────────────────────────────
connectDB();
connectCloudinary();

// ── Global Middleware ─────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            process.env.FRONTEND_URL || "https://shoe-mart-frontend.vercel.app",
            process.env.ADMIN_URL || "https://shoe-mart-admin.vercel.app",
          ]
        : [
            "http://localhost:5173", // frontend (Vite)
            "http://localhost:3000", // admin panel (Vite)
          ],
    credentials: true,
  }),
);

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "Shoemart API is running" });
});

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res
    .status(500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

// ── Start Server ──────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
