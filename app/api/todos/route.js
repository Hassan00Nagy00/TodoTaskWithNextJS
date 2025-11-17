import { NextResponse } from "next/server";
import { getAllTodos, addTodo } from "@/app/lib/todo.server";

export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json(todos, { status: 200 });
  } catch (err) {
    console.error("GET /api/todos error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data || !data.name || !data.description) {
      return NextResponse.json(
        { error: "name and description are required" },
        { status: 400 }
      );
    }
    const newTodo = await addTodo({
      name: data.name,
      description: data.description,
      deadline: data.deadline,
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (err) {
    console.error("POST /api/todos error:", err);
    const message = err.message || "Failed to create";
    const status =
      message.toLowerCase().includes("required") ||
      message.toLowerCase().includes("validation")
        ? 400
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
