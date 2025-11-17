import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    image: { type: String, required: [true, "Image URL is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    rating: { type: Number, default: 0 }, // out of 5
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;
