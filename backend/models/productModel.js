import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true }, // array of image URLs (Cloudinary)
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    gender: { type: String, enum: ["MEN", "WOMEN", "KIDS"], default: "MEN" },
    bestseller: { type: Boolean, default: false },
    stock: { type: Number, default: 100 },
    date: { type: Number, required: true }, // timestamp
  },
  { timestamps: true },
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
