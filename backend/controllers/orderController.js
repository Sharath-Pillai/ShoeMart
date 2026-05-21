import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const DELIVERY_CHARGE = 50;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ─── Place Order (COD / Card) ──────────────────────────────────────────────────
export const placeOrder = async (req, res) => {
  try {
    const { items, address, amount, paymentMethod, isBuyNow } = req.body;

    if (!items || items.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Order items are required." });
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "Delivery address is required." });

    const order = new orderModel({
      userId: req.userId,
      items,
      address,
      amount,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      date: Date.now(),
    });

    await order.save();

    // Clear user's cart after placing order (only if not from buy now)
    if (!isBuyNow) {
      await cartModel.findOneAndUpdate({ userId: req.userId }, { items: [] });
    }

    res
      .status(201)
      .json({
        success: true,
        message: "Order placed successfully.",
        orderId: order._id,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Place Order (Stripe) ─────────────────────────────────────────────────────
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address, amount, isBuyNow } = req.body;
    const { origin } = req.headers;

    const order = new orderModel({
      userId: req.userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    await order.save();

    // // Stripe session
    // const stripe = (await import("stripe")).default(process.env.STRIPE_SECRET_KEY);

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charge line item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charge" },
        unit_amount: DELIVERY_CHARGE * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${order._id}&isBuyNow=${isBuyNow}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}&isBuyNow=${isBuyNow}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Verify Stripe Payment ────────────────────────────────────────────────────
export const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, isBuyNow } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Placed",
      });
      // Only clear cart if it's not a buy now order
      if (!isBuyNow) {
        await cartModel.findOneAndUpdate({ userId: req.userId }, { items: [] });
      }
      res.json({ success: true, message: "Payment verified." });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed. Order cancelled." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Place Order (Razorpay) ───────────────────────────────────────────────────
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, address, amount, isBuyNow } = req.body;

    const order = new orderModel({
      userId: req.userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    await order.save();

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: order._id.toString(),
    });

    res.json({ success: true, razorpayOrder, orderId: order._id, isBuyNow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Verify Razorpay Payment ──────────────────────────────────────────────────
export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, orderId, isBuyNow } = req.body;

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);

    if (razorpayOrder.status === "paid") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Placed",
      });
      // Only clear cart if it's not a buy now order
      if (!isBuyNow) {
        await cartModel.findOneAndUpdate({ userId: req.userId }, { items: [] });
      }
      res.json({ success: true, message: "Payment verified." });
    } else {
      res.json({ success: false, message: "Payment not completed." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get My Orders (User) ─────────────────────────────────────────────────────
export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.userId })
      .populate("items.productId", "name image")
      .sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get All Orders (Admin) ───────────────────────────────────────────────────
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId", "name email")
      .sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Order Status (Admin) ──────────────────────────────────────────────
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });

    res.json({ success: true, message: "Order status updated.", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Cancel Order (User) ──────────────────────────────────────────────────────
export const cancelOrder = async (req, res) => {
  try {
    const order = await orderModel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });

    if (["Shipped", "Out For Delivery", "Delivered"].includes(order.status))
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot cancel order at this stage.",
        });

    order.status = "Cancelled";
    await order.save();
    res.json({ success: true, message: "Order cancelled.", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
