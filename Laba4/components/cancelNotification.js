import * as Notifications from 'expo-notifications';

export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('🔕 Повідомлення скасовано успішно:', notificationId);
    return true;
  } catch (error) {
    console.error('❌ Помилка скасування повідомлення:', error.message);
    return false;
  }
};
