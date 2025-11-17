import { getProductById } from "@/app/lib/product.server";
import { NextResponse } from "next/server";
import connectDB from "@/app/config/dbConnection";
import Product from "@/app/models/productModel";

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="card">
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: "6px" }}
      />
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}/5</p>
      <p>{product.description}</p>
    </div>
  );
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id).lean();

    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
