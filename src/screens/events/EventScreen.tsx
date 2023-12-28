import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InlineError from '../../components/InlineError';
import { RootNavigationTabParams } from '../../navigation/root/types';
import { useGetEventByIdQuery } from '../../services/events/events';
import EventActions from './components/EventActions';
import EventCountdown from './components/EventCountdown';
import EventHeader from './components/EventHeader';
import EventHostAndInfo from './components/EventHostAndInfo';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventSkeleton from './components/skeleton/EventSkeleton';

export default function EventScreen({
  navigation,
  route: {
    params: { id },
  },
}: RootNavigationTabParams<'EventModal'>) {
  const insets = useSafeAreaInsets();
  // Lets handle y scroll offset to animate header
  const offset = useSharedValue(0);

  const {
    data: event,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetEventByIdQuery({ id });

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: e => {
        offset.value = e.contentOffset.y;
      },
    },
    [],
  );

  React.useEffect(() => {
    if (isLoading || event) {
      return;
    }

    navigation.goBack();
  }, [event, isLoading, navigation]);

  if (isLoading || isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <EventHeader offsetY={offset} />
        <EventSkeleton />
      </View>
    );
  }

  if (!event || isError) {
    return (
      <View style={styles.errorContainer}>
        <EventHeader event={event} offsetY={offset} />
        <InlineError
          isError={!isError}
          isLoading={isLoading}
          message="There was an error loading the event..."
          refetch={refetch}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EventHeader event={event} offsetY={offset} />
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom + 100 },
        ]}
        onScroll={scrollHandler}
      >
        <View style={styles.contentContainer}>
          <EventCountdown event={event} />
          <EventImage event={event} />
          <EventHostAndInfo event={event} />
          <EventInfo event={event} />
        </View>
      </Animated.ScrollView>
      <EventActions event={event} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    gap: 20,
  },
});
