import express from 'express';
import auth from '../middleware/auth.js'; // Add .js extension for ES modules
import Notification from '../models/Notification.js'; // Add .js extension for ES modules

const router = express.Router();

// Get notifications for a user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Mark notification as read
router.put('/:notificationId/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) return res.status(404).json({ msg: 'Notification not found' });

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router; // Use export default for ES modules
