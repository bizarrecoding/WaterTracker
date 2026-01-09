import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import i18n from './i18n';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
    autoDismiss: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  // no isDevice check due to local notifications 
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  return true;
}

export async function cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleHydrationReminder() {
  // Cancel existing to avoid duplicates
  await cancelAllNotifications();

  console.log(`Scheduling hydration reminder in 3 hours`);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: i18n.t('notificationTitle'),
      body: i18n.t('notificationBody'),
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60 * 60 * 3,
      repeats: true,
    },
  });
}

// Optional: Function to update dynamic notification content (if we wanted to show progress)
// This is tricky with recurring, best used for one-off reminders.
export async function showHydrationStatusNotification(current: number, goal: number) {
  if (Platform.OS === 'android') {
    // Ensure channel exists for ongoing notifications if different from default
    // For simplicity reusing default but we could create a 'status' channel with LOW importance
  }

  await Notifications.scheduleNotificationAsync({
    // fixed id will replace existing notification
    identifier: 'hydration-status',
    content: {
      title: i18n.t('hydrationStatusTitle'),
      body: i18n.t('hydrationStatusBody', { current, goal }),
      sticky: true,
      priority: Notifications.AndroidNotificationPriority.LOW,
      sound: false,
      autoDismiss: false,
    },
    trigger: null,
  });
}
