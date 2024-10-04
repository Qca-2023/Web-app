// routes/projectRoutes.js
import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

// GET all projects
router.get('/', getProjects);

// GET a single project by ID
router.get('/:projectId', getProjectById);

// POST a new project
router.post('/', createProject);

// PUT to update a project
router.put('/:projectId', updateProject);

// DELETE a project
router.delete('/:projectId', deleteProject);

export default router;
