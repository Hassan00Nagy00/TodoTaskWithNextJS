"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("Saving…");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        description: form.description,
        image: form.image,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Something went wrong");
      return;
    }

    setMessage("Product added successfully!");

    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  }

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
      <h1>Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button
          type="submit"
          style={{ padding: 10, background: "black", color: "white" }}
        >
          Add Product
        </button>
      </form>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}
