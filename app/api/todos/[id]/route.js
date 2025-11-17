import { NextResponse } from "next/server";
import { getTodoById, updateTodo, deleteTodo } from "@/app/lib/todo.server";

function mapErrorToStatus(message = "") {
  const m = message.toLowerCase();
  if (
    m.includes("invalid task id") ||
    m.includes("invalid id") ||
    m.includes("casterror")
  )
    return 400;
  if (m.includes("not found")) return 404;
  if (m.includes("validation")) return 400;
  return 500;
}

// GET /api/todos/:id
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const task = await getTodoById(id);
    if (!task)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error("GET /api/todos/:id error:", err);
    const status = mapErrorToStatus(err.message);
    return NextResponse.json({ error: err.message }, { status });
  }
}

// PATCH /api/todos/:id
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No data to update" }, { status: 400 });
    }

    const updated = await updateTodo(id, data);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("PATCH /api/todos/:id error:", err);
    const status = mapErrorToStatus(err.message);
    return NextResponse.json({ error: err.message }, { status });
  }
}

// DELETE /api/todos/:id
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteTodo(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/todos/:id error:", err);
    const status = mapErrorToStatus(err.message);
    return NextResponse.json({ error: err.message }, { status });
  }
}
