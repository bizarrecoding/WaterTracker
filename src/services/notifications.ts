import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice || true) { // Allow on simulator for now to at least try logic
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
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    console.log('Must use physical device for Push Notifications by default, but local might work');
  }

  return true; // Success implies we can schedule
}

export async function cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleHydrationReminder() {
  // Cancel existing to avoid duplicates if called multiple times or logic changes
  await cancelAllNotifications();

  // Schedule a recurring notification
  // For demonstration, let's say every 2 hours or just a repeated trigger.
  // Expo Notifications `timeInterval` is seconds.
  
  console.log('Scheduling hydration reminder in', 30, `seconds`);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💧 Time to Hydrate!",
      body: "Keep up with your daily goal. Drink some water now!",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 30 * 1, // Every 2 hours
      repeats: true,
    },
  });
}

// Optional: Function to update dynamic notification content (if we wanted to show progress)
// This is tricky with recurring, best used for one-off reminders.
