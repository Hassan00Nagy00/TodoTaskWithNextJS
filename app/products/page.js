async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            margin: "10px 0",
            borderRadius: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Price: {p.price}</p>

          {p.image && (
            <img
              src={p.image}
              width="150"
              alt={p.name}
              style={{ borderRadius: 10, marginTop: 10 }}
            />
          )}

          {/* 🔥 Add View Details Button Here */}
          <Link
            href={`/products/${p._id}`}
            style={{
              display: "inline-block",
              marginTop: 10,
              padding: "6px 12px",
              background: "black",
              color: "white",
              borderRadius: "6px",
            }}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
