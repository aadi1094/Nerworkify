import Notification from "../model/notification.schema.js";

export const createNotification = async (recipientId, senderId, type, postId = null) => {
    try {
        const notification = await Notification.create({
            recipient: recipientId,
            sender: senderId,
            type,
            post: postId,
        });
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

// Get user's notifications
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ recipient: userId })
            .populate('sender', 'username image')
            .populate('post', 'content')
            .sort({ createdAt: -1 });

        res.status(200).json({
            notifications
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            message: 'Error fetching notifications'
        });
    }
};

// Mark notifications as read
export const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        await Notification.updateMany(
            { recipient: userId, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({
            message: 'Notifications marked as read'
        });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({
            message: 'Error updating notifications'
        });
    }
};

// Clear notification
export const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user.id;

        const notification = await Notification.findOneAndDelete({
            _id: notificationId,
            recipient: userId
        });

        if (!notification) {
            return res.status(404).json({
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({
            message: 'Error deleting notification'
        });
    }
};




