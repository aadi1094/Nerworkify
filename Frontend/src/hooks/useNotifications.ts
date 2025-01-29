import { useState, useEffect } from 'react';
import { axiosInstance } from '../utils/axios';

export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await axiosInstance.get("/notifications")

        if (!response.data) throw new Error('Failed to fetch notifications');

        const data = await response.data;
        const unread = data.notifications.filter((n:any) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return { unreadCount };
};