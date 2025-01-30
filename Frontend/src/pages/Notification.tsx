import { useState, useEffect } from 'react';
import { NotificationItem } from '../components/Notifications/NotificationItem';
import { Notification } from '../components/Notifications/types';
import { axiosInstance } from '@/utils/axios';
import Nav_Home from '@/components/Home/Nav_Home';
// import { NotificationItem } from './NotificationItem';
// import type { Notification } from './types';

interface ApiResponse {
  notifications: Notification[];
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
    markNotificationsAsRead();
  }, []);

  const fetchNotifications = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axiosInstance.get("/notification")

      if (!response.data) throw new Error('Failed to fetch notifications');

      const data: ApiResponse = await response.data;
      setNotifications(data.notifications);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const markNotificationsAsRead = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axiosInstance.put("/notification/mark-read")

      if (!response.data) throw new Error('Failed to mark notifications as read');
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error: {error}
      </div>
    );
  }

  return (
    <>
    <Nav_Home/>
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No notifications yet
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification._id} 
              notification={notification} 
            />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default NotificationsPage;