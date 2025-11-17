"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch("/api/todos");
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();

      data.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
      setTasks(data);
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`/api/todos/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        console.error("toggleComplete failed:", d.error || res.status);
      }
      fetchTasks();
    } catch (err) {
      console.error("toggleComplete error:", err);
    }
  };

  const removeTask = async (task) => {
    try {
      const res = await fetch(`/api/todos/${task._id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        console.error("delete failed:", d.error || res.status);
      }
      fetchTasks();
    } catch (err) {
      console.error("removeTask error:", err);
    }
  };

  return (
    <div>
      <div className="card">
        <h1>Tasks</h1>
        <p className="task-meta">
          Manage your tasks. Toggle complete or delete.
        </p>
      </div>

      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <div className="card empty">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="card empty">
            No tasks yet — go to Add Task to create one.
          </div>
        ) : (
          tasks.map((t) => (
            <div
              key={t._id}
              className={`task ${t.completed ? "completed" : ""}`}
            >
              <div className="task-left">
                <p className="task-title">{t.name}</p>
                <p className="task-desc">{t.description}</p>
                <p className="task-meta">
                  Deadline: {new Date(t.deadline).toLocaleString()}
                </p>
              </div>

              <div className="controls">
                <button className="small" onClick={() => toggleComplete(t)}>
                  {t.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button className="small" onClick={() => removeTask(t)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
