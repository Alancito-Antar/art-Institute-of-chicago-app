import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useGetEventsQuery } from "../../services/events/events";
import { HomeStackScreenProps } from "../../navigation/main_tabs/home/types";
import EventCards from "../../components/EventCard";
import EventCard from "../../components/EventCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeMainScreen({
  navigation,
}: HomeStackScreenProps<"HomeMain">) {
  const { data: events, isLoading, error } = useGetEventsQuery();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "white" }}>
      <FlatList
        contentContainerStyle={{ padding: 20, alignItems: "center" }}
        data={events?.data}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={(id) => navigation.navigate("EventModal", { id })}
          />
        )}
      />

      {error ? <Text>{JSON.stringify(error)}</Text> : null}
    </View>
  );
}
