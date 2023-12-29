import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import moment from 'moment';
import { Event } from '../services/events/types';

// Lets ask users for notifications permissions
export const askNotificationsPermissions = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Required for iOS
  // See https://notifee.app/react-native/docs/ios/permissions
  await notifee.requestPermission();
};

// Lets create a trigger notification for 1 day after the event
export const createTriggerNotification = async (event: Event) => {
  const now = moment();

  // If we have already pass the 9am time, lets set the first notification for tomorrow
  if (now.hour() >= 9) {
    now.set('date', now.date() + 1);
  }

  now.set('hours', 9);
  now.set('minutes', 0);
  now.set('seconds', 0);

  const startDate = moment(event.start_date);
  const daysDif = now.diff(startDate, 'days');

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: now.valueOf(),
    repeatFrequency: RepeatFrequency.DAILY,
  };

  try {
    // Lets create the trigger notification
    await notifee.createTriggerNotification(
      {
        id: event.id.toString(),
        title: event.title,
        body:
          daysDif > 0
            ? `Events starts in ${daysDif} days`
            : `Event starts today at ${event.start_time}`,
        android: {
          channelId: 'default',
        },
      },
      trigger,
    );

    console.log('Trigger notification has been set');
  } catch (e) {
    console.log(e);
  }
};

export const cancelTriggerNotification = async (eventId: number) => {
  await notifee.cancelTriggerNotification(eventId.toString());
};
