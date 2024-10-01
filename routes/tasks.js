// routes/tasks.js
const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

// Create a task
router.post('/', auth, async (req, res) => {
  const { project, name, description, assignedTo } = req.body;

  try {
    const task = new Task({
      project,
      name,
      description,
      assignedTo,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get tasks for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add a comment to a task
router.post('/:taskId/comment', auth, async (req, res) => {
  const { text } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);
    task.comments.push({ user: req.user, text });
    await task.save();
    res.json(task.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
