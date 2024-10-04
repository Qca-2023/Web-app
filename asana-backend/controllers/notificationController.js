// controllers/notificationController.js
import Notification from '../models/notificationModel.js'; // Assume you have a Notification model

// GET all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT to mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { isRead: true },
      { new: true }
    );
    if (!updatedNotification)
      return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
