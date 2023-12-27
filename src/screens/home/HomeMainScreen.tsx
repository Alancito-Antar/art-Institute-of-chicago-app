import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventsGrid from '../../components/EventsGrid';
import useEffectOnce from '../../hooks/useEffectOnce';
import { HomeStackScreenProps } from '../../navigation/main_tabs/home/types';
import { useLazyGetEventsQuery } from '../../services/events/events';
import { Event } from '../../services/events/types';

const PAGE_SIZE = 10;
export default function HomeMainScreen({
  navigation,
}: HomeStackScreenProps<'HomeMain'>) {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [events, setEvents] = React.useState<Event[]>([]);

  const [fetchEvents, { data, isLoading, isFetching, error }] =
    useLazyGetEventsQuery();

  const insets = useSafeAreaInsets();

  // Loads a new page of data and updates the state
  const loadPage = React.useCallback(
    async (page: number, currentData: Event[]) => {
      try {
        console.debug('Loading page: ', page);

        const newEvents = await fetchEvents({
          limit: PAGE_SIZE,
          page,
        }).unwrap();

        const updatedData = [...currentData, ...newEvents.data];

        setEvents(updatedData);
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
    loadPage(1, []);
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <EventsGrid
        data={events}
        onItemPress={onEventPress}
        ListFooterComponent={() => {
          // if (isError && !isFetching) {
          //   return (
          //     <InlineLoadError
          //       isError={isError}
          //       isLoading={isLoading}
          //       refetch={loadNextPage}
          //       message="Error fetching events"
          //     />
          //   );
          // }

          if (!isFetching) {
            return null;
          }
          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
            </View>
          );
        }}
        onEndReachedThreshold={1}
        onEndReached={loadNextPage}
      />

      {error ? <Text>{JSON.stringify(error)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  loadingContainer: { marginTop: 20 },
});
