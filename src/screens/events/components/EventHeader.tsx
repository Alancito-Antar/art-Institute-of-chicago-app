import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  ImageRequireSource,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CalendarManager from '../../../native_modules/CalendarManager';
import { Event } from '../../../services/events/types';
import { saveFavoritesData } from '../../../store/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

function EventHeaderAction({
  imageSource,
  onPress,
}: {
  imageSource: ImageRequireSource;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Image
        style={styles.eventHeaderAction}
        source={imageSource}
        accessibilityIgnoresInvertColors
      />
    </Pressable>
  );
}

export default function EventHeader({
  event,
  offsetY,
}: {
  event?: Event;
  offsetY: SharedValue<number>;
}) {
  const isFavorite =
    useAppSelector(state => state.favorites.events).findIndex(
      x => event?.id === x.id,
    ) !== -1;

  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const animatedStyles = useAnimatedStyle(() => {
    // Just animate on and off, when we scroll > 0
    const opacity = withTiming(offsetY.value > 0 ? 1 : 0, {
      duration: 250,
    });

    return {
      opacity,
    };
  });

  const onSavedPressed = () => {
    if (!event) {
      return;
    }

    dispatch(saveFavoritesData(event));
  };

  const onAddCalendarEventPress = React.useCallback(async () => {
    if (!event) {
      return;
    }

    const onError = (e: unknown) => Alert.alert('Whoops!', e as string);
    const onSuccess = (message: string) => Alert.alert('Yeeey!', message);

    Alert.alert(
      'Add Event to Calendar',
      "Hey there! Do you want to add this event to your phone's calendar app?",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Lets go for it!',
          onPress: () =>
            CalendarManager.addEventToCalendar(
              event?.title,
              event?.location,
              event?.start_date,
              event?.end_date,
              onError,
              onSuccess,
            ),
        },
      ],
    );
  }, [event]);

  return (
    <View style={[styles.container, { paddingTop: insets.top || 10 }]}>
      {/* The animated view will change the opacity of the BG */}
      <Animated.View style={[styles.animatedViewContainer, animatedStyles]} />

      <EventHeaderAction
        imageSource={require('../../../assets/icons/event/ic_chevron_left.png')}
        onPress={navigation.goBack}
      />

      {event ? (
        <View style={styles.headerActionsContainer}>
          <EventHeaderAction
            imageSource={
              isFavorite
                ? require('../../../assets/icons/event/ic_favorites_full.png')
                : require('../../../assets/icons/common/ic_favorites.png')
            }
            onPress={onSavedPressed}
          />

          {Platform.OS === 'ios' ? (
            <EventHeaderAction
              imageSource={require('../../../assets/icons/event/ic_calendar.png')}
              onPress={onAddCalendarEventPress}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    zIndex: 10,
  },
  animatedViewContainer: {
    position: 'absolute',
    height: Platform.OS === 'android' ? 48 : 100,
    left: 0,
    right: 0,
    zIndex: -10,
    backgroundColor: 'white',
  },
  headerActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  eventHeaderAction: {
    width: 20,
    height: 20,
    tintColor: '#B60235',
  },
});
