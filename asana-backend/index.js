// index.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Implement serving static files if needed
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
