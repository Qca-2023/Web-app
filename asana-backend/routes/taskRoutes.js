// routes/taskRoutes.js
import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// GET all tasks for a project
router.get('/project/:projectId', getTasks);

// GET a single task by ID
router.get('/:taskId', getTaskById);

// POST a new task
router.post('/', createTask);

// PUT to update a task
router.put('/:taskId', updateTask);

// DELETE a task
router.delete('/:taskId', deleteTask);

export default router;
