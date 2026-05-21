import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// ─── Get Cart ─────────────────────────────────────────────────────────────────
export const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.userId })
      .populate("items.productId", "name price image sizes stock");

    if (!cart) return res.json({ success: true, items: [] });

    res.json({ success: true, items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Add to Cart ──────────────────────────────────────────────────────────────
export const addToCart = async (req, res) => {
  try {
    const { productId, size, color = "", quantity = 1 } = req.body;

    if (!productId || !size)
      return res
        .status(400)
        .json({ success: false, message: "productId and size are required." });

    // Validate product exists
    const product = await productModel.findById(productId);
    console.log(product);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });

    // Validate size (robust check for both number and string types)
    const availableSizes = product.sizes.map(s => String(s));
    if (!availableSizes.includes(String(size)))
      return res.status(400).json({
        success: false,
        message: `Size "${size}" is not available for this product. Available sizes: ${availableSizes.join(", ")}`,
      });

    let cart = await cartModel.findOne({ userId: req.userId });

    if (!cart) {
      // Create new cart
      cart = new cartModel({
        userId: req.userId,
        items: [{ productId, color, size, quantity }],
      });
    } else {
      // Check if same product+size+color already in cart
      const existingIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          String(item.size) === String(size) &&
          item.color === color,
      );

      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += Number(quantity);
      } else {
        cart.items.push({ productId, color, size, quantity });
      }
    }

    await cart.save();
    await cart.populate("items.productId", "name price image sizes stock");
    res.json({
      success: true,
      message: "Item added to cart.",
      items: cart.items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Cart Item Quantity ─────────────────────────────────────────────────
export const updateCart = async (req, res) => {
  try {
    const { productId, size, color = "", quantity } = req.body;

    if (!productId || !size || quantity === undefined)
      return res.status(400).json({
        success: false,
        message: "productId, size, and quantity are required.",
      });

    const cart = await cartModel.findOne({ userId: req.userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });

    const index = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        String(item.size) === String(size) &&
        item.color === color,
    );

    if (index === -1)
      return res
        .status(404)
        .json({ success: false, message: "Item not in cart." });

    if (Number(quantity) <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = Number(quantity);
    }

    await cart.save();
    await cart.populate("items.productId", "name price image sizes stock");
    res.json({ success: true, message: "Cart updated.", items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Remove Item from Cart ────────────────────────────────────────────────────
export const removeFromCart = async (req, res) => {
  try {
    const { productId, size, color = "" } = req.body;

    if (!productId || !size)
      return res
        .status(400)
        .json({ success: false, message: "productId and size are required." });

    const cart = await cartModel.findOne({ userId: req.userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          String(item.size) === String(size) &&
          item.color === color
        ),
    );

    await cart.save();
    await cart.populate("items.productId", "name price image sizes stock");
    res.json({
      success: true,
      message: "Item removed from cart.",
      items: cart.items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Clear Cart ───────────────────────────────────────────────────────────────
export const clearCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });

    cart.items = [];
    await cart.save();
    res.json({
      success: true,
      message: "Cart cleared successfully.",
      items: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
