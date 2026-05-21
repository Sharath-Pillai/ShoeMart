import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ─── Add Product ──────────────────────────────────────────────────────────────
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
      stock,
      imageURL,
      gender,
    } = req.body;

    let imageUrls = [];

    // Check if imageURL is provided as string (from admin form)
    if (imageURL && typeof imageURL === "string" && imageURL.trim()) {
      imageUrls = [imageURL];
    } else if (req.files && req.files.length > 0) {
      // Upload file-based images to Cloudinary
      imageUrls = await Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "shoemart/products" },
                (err, result) =>
                  err ? reject(err) : resolve(result.secure_url),
              );
              stream.end(file.buffer);
            }),
        ),
      );
    } else {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required.",
      });
    }

    const product = new productModel({
      name,
      brand,
      description,
      price: Number(price),
      image: imageUrls,
      category,
      subcategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === "true",
      stock: stock ? Number(stock) : 100,
      gender: gender || "MEN",
      date: Date.now(),
    });

    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully.", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get All Products ─────────────────────────────────────────────────────────
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      bestseller,
      minPrice,
      maxPrice,
      search,
      sort,
    } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (bestseller === "true") filter.bestseller = true;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (search) filter.name = { $regex: search, $options: "i" };

    let query = productModel.find(filter);

    if (sort === "low-high") query = query.sort({ price: 1 });
    else if (sort === "high-low") query = query.sort({ price: -1 });
    else if (sort === "newest") query = query.sort({ date: -1 });
    else query = query.sort({ date: -1 });

    const products = await query;
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Single Product ───────────────────────────────────────────────────────
export const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Product ───────────────────────────────────────────────────────────
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
      stock,
      imageURL,
      gender,
    } = req.body;

    const updates = {
      name,
      brand,
      description,
      price: Number(price),
      category,
      subcategory,
      bestseller: bestseller === "true",
      stock: Number(stock),
      gender: gender || "MEN",
    };
    if (sizes) updates.sizes = JSON.parse(sizes);

    // Handle image uploads/updates
    if (imageURL && typeof imageURL === "string" && imageURL.trim()) {
      // Direct image URL provided
      updates.image = [imageURL];
    } else if (req.files && req.files.length > 0) {
      // Upload new files to Cloudinary
      const imageUrls = await Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "shoemart/products" },
                (err, result) =>
                  err ? reject(err) : resolve(result.secure_url),
              );
              stream.end(file.buffer);
            }),
        ),
      );
      updates.image = imageUrls;
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });

    res.json({ success: true, message: "Product updated.", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Delete Product ───────────────────────────────────────────────────────────
export const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    res.json({ success: true, message: "Product deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
