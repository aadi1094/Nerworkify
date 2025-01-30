import { FC } from 'react';
import { Bell } from 'lucide-react';

interface NotificationButtonProps {
  unreadCount: number;
}

export const NotificationButton: FC<NotificationButtonProps> = ({ unreadCount }) => {
  return (
    <div className="relative flex flex-col justify-center items-center p-0 m-0">
      <Bell className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800" />
      <p className='text-xs'>Notifications</p>
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {unreadCount}
        </div>
      )}
    </div>
  );
};
