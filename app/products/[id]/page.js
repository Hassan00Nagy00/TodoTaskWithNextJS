import Image from "next/image";

async function getProduct(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductDetails({ params }) {
  const product = await getProduct(params.id);

  if (!product || product.error) {
    return <h2 style={{ padding: 20 }}>Product not found</h2>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          width="250"
          style={{ borderRadius: 10, marginTop: 20 }}
        />
      )}

      <p style={{ marginTop: 20 }}>{product.description}</p>
      <p style={{ fontWeight: "bold", marginTop: 10 }}>
        Price: {product.price} EGP
      </p>
    </div>
  );
}
