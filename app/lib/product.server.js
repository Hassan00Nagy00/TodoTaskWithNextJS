import connectDB from "../config/dbConnection";

import ProductModel from "../models/productsModel.js";

export async function getAllProducts() {
  await connectDB();
  const docs = await ProductModel.find().lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getProductById(id) {
  try {
    await connectDB();
    const doc = await ProductModel.findById(id).lean();
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  } catch (err) {
    if (err.name === "CastError") throw new Error("Invalid product ID format");
    throw new Error("Failed to fetch product");
  }
}
