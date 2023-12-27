import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  useGetEventsQuery,
  useLazyGetEventsQuery,
} from "../../services/events/events";
import { HomeStackScreenProps } from "../../navigation/main_tabs/home/types";
import EventCards from "../../components/EventCard";
import EventCard from "../../components/EventCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Event } from "../../services/events/types";

const PAGE_SIZE = 10;
export default function HomeMainScreen({
  navigation,
}: HomeStackScreenProps<"HomeMain">) {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [events, setEvents] = React.useState<Event[]>([]);

  const [fetchEvents, { data, isLoading, isFetching, isError, error }] =
    useLazyGetEventsQuery();

  const insets = useSafeAreaInsets();

  // Loads a new page of data and updates the state
  const loadPage = React.useCallback(
    async (page: number, currentData: Event[]) => {
      try {
        console.debug("Loading page: ", page);

        const newTransactions = await fetchEvents({
          offset: PAGE_SIZE,
          current_page: page,
        }).unwrap();

        const updatedData = [...currentData, ...newTransactions.data];

        setEvents(updatedData);
        setCurrentPage(page);
      } catch {
        // No need to do anything, isError will be set in the hook return value
      }
    },
    [fetchEvents]
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
  }, [currentPage, isFetching, isLoading, loadPage]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "white" }}>
      <FlatList
        contentContainerStyle={{ padding: 20, alignItems: "center" }}
        data={events}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={(id) => navigation.navigate("EventModal", { id })}
          />
        )}
        ListFooterComponent={() => {
          // if (isError && !isFetching) {
          //   return (
          //     <InlineLoadError
          //       isError={isError}
          //       isLoading={isLoading}
          //       refetch={loadNextPage}
          //       message="Error fetching transactions"
          //     />
          //   );
          // }

          if (!isFetching) {
            return null;
          }
          return (
            <View style={{ marginTop: 20 }}>
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
