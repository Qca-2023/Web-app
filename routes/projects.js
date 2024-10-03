import express from 'express';
import auth from '../middleware/auth.js'; // Add .js extension for ES module
import Project from '../models/Project.js'; // Add .js extension for ES module

const router = express.Router();

// Create a project
router.post('/', auth, async (req, res) => {
  const { name, description, members } = req.body;

  try {
    const project = new Project({
      name,
      description,
      owner: req.user,
      members: [req.user, ...members],
    });
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all projects for a user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router; // Use export default for ES module
