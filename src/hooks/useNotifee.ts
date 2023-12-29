import notfiee, { EventType } from '@notifee/react-native';
import React from 'react';

// Little hook we could use for setting up the logic for the notifications and their setups
export default function useNotifee() {
  React.useEffect(() => {
    const unsubscribe = notfiee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    return () => unsubscribe();
  }, []);
}
