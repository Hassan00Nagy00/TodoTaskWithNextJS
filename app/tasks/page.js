"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTaskPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !description.trim()) {
      setError("Please fill name and description");
      return;
    }
    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
      };

      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add New Task</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>
      )}
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Deadline (optional)</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setName("");
              setDescription("");
              setDeadline("");
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
