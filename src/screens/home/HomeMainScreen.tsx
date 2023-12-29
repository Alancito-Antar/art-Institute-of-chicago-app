/* eslint-disable import/no-cycle */
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventsList from '../../components/EventsList';
import InlineError from '../../components/InlineError';
import { processEventsNewPage } from '../../helpers/events';
import { askNotificationsPermissions } from '../../helpers/notifee';
import useEffectOnce from '../../hooks/useEffectOnce';
import { HomeStackScreenProps } from '../../navigation/main_tabs/home/types';
import { useLazyGetEventsQuery } from '../../services/events/events';
import { Event } from '../../services/events/types';
import EmptyEventList from './components/EmptyEventList';
import EventsListSkeleton from './components/skeleton/EventsListSkeleton';

export interface EventGroup {
  groupDate: string;
  data: Event[];
}

const PAGE_SIZE = 10;
export default function HomeMainScreen({
  navigation,
}: HomeStackScreenProps<'HomeMain'>) {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [events, setEvents] = React.useState<EventGroup[]>([]);

  const [fetchEvents, { data, isLoading, isFetching, isError }] =
    useLazyGetEventsQuery();

  const insets = useSafeAreaInsets();

  // Loads a new page of data and updates the state
  const loadPage = React.useCallback(
    async (page: number, currentData: EventGroup[]) => {
      try {
        console.debug('Loading page: ', page);

        const newEvents = await fetchEvents({
          limit: PAGE_SIZE,
          page,
        }).unwrap();

        setEvents(processEventsNewPage(newEvents.data, currentData));
        setCurrentPage(page);
      } catch {
        // No need to do anything, isError will be set in the hook return value
      }
    },
    [fetchEvents],
  );

  const loadNextPage = React.useCallback(async () => {
    // Only load 1 page at a time, and stop when we reach the end
    if (
      currentPage === data?.pagination.total_pages ||
      isLoading ||
      isFetching
    ) {
      return;
    }

    loadPage(currentPage + 1, events);
  }, [
    currentPage,
    data?.pagination.total_pages,
    events,
    isFetching,
    isLoading,
    loadPage,
  ]);

  const onEventPress = (id: number) => {
    // We could add some analytics here and what not.
    navigation.navigate('EventModal', { id });
  };

  // On mount, load the first page
  useEffectOnce(() => {
    askNotificationsPermissions();
    loadPage(1, []);
  });

  if (isLoading) {
    return <EventsListSkeleton />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <EventsList
        sections={events}
        onItemPress={onEventPress}
        refreshControl={
          <RefreshControl
            refreshing={events.length > 0 && (isLoading || isFetching)}
            onRefresh={() => loadPage(1, [])}
          />
        }
        ListFooterComponent={() => {
          if (isError && !isFetching) {
            return (
              <InlineError
                isError={isError}
                isLoading={isLoading}
                refetch={loadNextPage}
                message="Error fetching events"
              />
            );
          }

          if (!isFetching) {
            return null;
          }

          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
            </View>
          );
        }}
        ListEmptyComponent={() => {
          if (events.length === 0 && (isLoading || isFetching)) {
            return null;
          }
          return <EmptyEventList />;
        }}
        onEndReachedThreshold={1}
        onEndReached={loadNextPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  loadingContainer: { marginTop: 20 },
});
