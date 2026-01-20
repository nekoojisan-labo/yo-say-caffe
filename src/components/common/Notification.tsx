import { useEffect } from 'react';
import { useNotificationStore } from '@/store';
import type { Notification as NotificationType } from '@/types';

const typeStyles = {
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: '✅',
    text: 'text-green-800',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: '❌',
    text: 'text-red-800',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'ℹ️',
    text: 'text-blue-800',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: '⚠️',
    text: 'text-yellow-800',
  },
};

// 単一の通知アイテム
interface NotificationItemProps {
  notification: NotificationType;
  onClose: (id: string) => void;
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const styles = typeStyles[notification.type];

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3
        ${styles.bg} border ${styles.text}
        rounded-xl shadow-soft
        animate-slide-down
      `}
    >
      <span className="text-lg">{styles.icon}</span>
      <p className="flex-1 text-sm font-medium">{notification.message}</p>
      <button
        onClick={() => onClose(notification.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

// 通知コンテナ
export function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
}

// 通知を表示するカスタムフック
export function useNotification() {
  const addNotification = useNotificationStore((state) => state.addNotification);

  return {
    success: (message: string, duration?: number) =>
      addNotification('success', message, duration),
    error: (message: string, duration?: number) =>
      addNotification('error', message, duration),
    info: (message: string, duration?: number) =>
      addNotification('info', message, duration),
    warning: (message: string, duration?: number) =>
      addNotification('warning', message, duration),
  };
}

// トースト形式の軽量通知
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = typeStyles[type];

  return (
    <div
      className={`
        fixed bottom-20 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-2 px-4 py-2
        ${styles.bg} border ${styles.text}
        rounded-full shadow-lg
        animate-slide-up
      `}
    >
      <span>{styles.icon}</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
