import { NextResponse } from "next/server";
import connectDB from "../../config/dbConnection";
import Product from "../../models/productsModel";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().lean();

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      {products.map((p) => (
        <div
          key={p._id}
          style={{ border: "1px solid #ccc", padding: 15, margin: "10px 0" }}
        >
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Price: {p.price}</p>
          {p.image && <img src={p.image} alt="" width="150" />}
        </div>
      ))}
    </div>
  );
}
