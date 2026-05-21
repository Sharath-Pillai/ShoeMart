import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
  verifyRazorpay,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";

const orderRouter = express.Router();

// ── Protected (User) ──────────────────────────────────────────────────────────
orderRouter.post("/place", authUser, placeOrder);                      // COD
orderRouter.post("/stripe", authUser, placeOrderStripe);               // Stripe checkout
orderRouter.post("/verifyStripe", authUser, verifyStripe);             // Stripe verification
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);           // Razorpay checkout
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);         // Razorpay verification
orderRouter.get("/myorders", authUser, getUserOrders);                  // User's own orders
orderRouter.put("/cancel/:id", authUser, cancelOrder);                  // Cancel order

// ── Protected (Admin) ─────────────────────────────────────────────────────────
orderRouter.get("/all", authAdmin, getAllOrders);                        // All orders list
orderRouter.put("/status", authAdmin, updateOrderStatus);               // Update order status

export default orderRouter;
