// routes/projects.js
const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/Project');

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

module.exports = router;
