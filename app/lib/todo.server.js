import connectDB from "@/app/config/dbConnection";
import ToDoModel from "@/app/models/todoModel";

// simple server helpers (junior naming)
export async function getAllTodos() {
  await connectDB();
  const docs = await ToDoModel.find().lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getTodoById(id) {
  try {
    await connectDB();
    const doc = await ToDoModel.findById(id).lean();
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  } catch (err) {
    if (err.name === "CastError") throw new Error("Invalid task ID format");
    throw new Error("Failed to fetch todo");
  }
}

export async function addTodo(payload) {
  try {
    await connectDB();
    if (!payload.deadline) payload.deadline = Date.now();
    const created = await ToDoModel.create(payload);
    return JSON.parse(JSON.stringify(created));
  } catch (err) {
    if (err.name === "ValidationError") {
      throw new Error(
        Object.values(err.errors)
          .map((e) => e.message)
          .join(", ")
      );
    }
    throw new Error("Failed to create todo");
  }
}

export async function updateTodo(id, data) {
  try {
    await connectDB();
    const updated = await ToDoModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) throw new Error("Todo not found");
    return JSON.parse(JSON.stringify(updated));
  } catch (err) {
    if (err.name === "ValidationError") {
      throw new Error(
        Object.values(err.errors)
          .map((e) => e.message)
          .join(", ")
      );
    }
    if (err.name === "CastError") throw new Error("Invalid task ID format");
    throw new Error("Failed to update todo");
  }
}

export async function deleteTodo(id) {
  try {
    await connectDB();
    const res = await ToDoModel.findByIdAndDelete(id);
    if (!res) throw new Error("Todo not found");
    return;
  } catch (err) {
    if (err.name === "CastError") throw new Error("Invalid task ID format");
    throw new Error("Failed to delete todo");
  }
}
