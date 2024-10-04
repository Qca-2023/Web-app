// controllers/projectController.js
import Project from '../models/projectModel.js'; // Assume you have a Project model

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new project
export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT to update a project
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body,
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a project
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
