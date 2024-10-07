// index.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import fileURLToPath

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'https://your-frontend-url.com', // Replace with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Enable this if you're sending cookies or authorization headers
};

app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Get the current directory path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const frontendBuildPath = path.join(__dirname, '../asana-frontend/build');
  app.use(express.static(frontendBuildPath)); // Serve static files from the frontend build

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Create HTTP server and initialize Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update as per your frontend URL
  },
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Make io accessible to routes
app.set('io', io);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
