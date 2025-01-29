// notification.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { 
    getNotifications, 
    markAsRead, 
    deleteNotification 
} from '../controller/notification.controller.js';

const notificationRouter = express.Router();

notificationRouter.get('/', authenticate, getNotifications);
notificationRouter.put('/mark-read', authenticate, markAsRead);
notificationRouter.delete('/:id', authenticate, deleteNotification);

export default notificationRouter;