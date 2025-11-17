import mongoose from "mongoose";

// simple todo schema
const ToDoSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    deadline: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ToDoModel = mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);

export default ToDoModel;
