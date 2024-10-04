// models/Task.js
import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
  name: String,
  isCompleted: { type: Boolean, default: false },
});

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  date: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  name: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'To Do' },
  dueDate: Date,
  attachments: [String],
  subtasks: [subtaskSchema],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
