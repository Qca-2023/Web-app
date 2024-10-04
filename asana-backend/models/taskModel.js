import mongoose from 'mongoose';

// Define the task schema
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do',
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    comments: [
      {
        comment: { type: String },
        commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        commentedAt: { type: Date, default: Date.now },
      },
    ],
    attachments: [
      {
        url: { type: String },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;
