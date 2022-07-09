import { NotificationProps, showNotification } from '@mantine/notifications';

export { NotificationsProvider } from '@mantine/notifications';

const TYPE_TO_COLOR = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

export const noti = {
  show(
    type: 'info' | 'success' | 'warning' | 'error',
    message: React.ReactNode,
    { title }: Partial<Pick<NotificationProps, 'title'>> = {}
  ) {
    showNotification({ message, color: TYPE_TO_COLOR[type], title });
  },
};
