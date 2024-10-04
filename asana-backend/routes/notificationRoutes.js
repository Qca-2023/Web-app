// routes/notificationRoutes.js
import express from 'express';
import {
  getNotifications,
  markNotificationAsRead,
} from '../controllers/notificationController.js';

const router = express.Router();

// GET all notifications for a user
router.get('/:userId', getNotifications);

// PUT to mark a notification as read
router.put('/:notificationId', markNotificationAsRead);

export default router;
