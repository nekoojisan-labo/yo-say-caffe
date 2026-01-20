import { create } from 'zustand';
import type { Notification } from '@/types';

interface NotificationStore {
  notifications: Notification[];

  // 通知を追加
  addNotification: (
    type: Notification['type'],
    message: string,
    duration?: number
  ) => string;

  // 通知を削除
  removeNotification: (id: string) => void;

  // すべての通知をクリア
  clearNotifications: () => void;
}

let notificationIdCounter = 0;

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],

  addNotification: (type, message, duration = 3000) => {
    const id = `notification_${++notificationIdCounter}`;
    const notification: Notification = {
      id,
      type,
      message,
      duration,
    };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    // 自動削除
    if (duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, duration);
    }

    return id;
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
