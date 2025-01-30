import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Notification } from './types';

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getMessage = () => {
    switch (notification.type) {
      case 'LIKE':
        return (
          <div className="flex items-center gap-3 ">
            <img 
              src={notification.sender.image} 
              alt={notification.sender.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <span className="font-medium">{notification.sender.username}</span>
              <span className="text-gray-600"> liked your post</span>
              {notification.post?.content && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                  "{notification.post.content}"
                </p>
              )}
            </div>
          </div>
        );
      case 'CONNECTION':
        return (
          <div className="flex items-center gap-3">
            <img 
              src={notification.sender.image} 
              alt={notification.sender.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <span className="font-medium">{notification.sender.username}</span>
              <span className="text-gray-600"> connected with you</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`mb-3  ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}>
      <CardContent className="p-4 bg-[#EEF2FF]">
        {getMessage()}
        <div className="text-xs text-gray-500 mt-2">
          {formatTime(notification.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
};
