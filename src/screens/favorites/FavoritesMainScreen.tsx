import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import EventCard from "../../components/EventCard";
import {
  FavoritesNavigationParams,
  FavoritesStackScreenProps,
} from "../../navigation/main_tabs/favorites/types";

export default function FavoritesMainScreen({
  navigation,
}: FavoritesStackScreenProps<"FavoritesMain">) {
  const favoritesEvents = useAppSelector((state) => state.favorites.events);

  return (
    <View>
      <Text>Favorites</Text>
      <FlatList
        contentContainerStyle={{ padding: 20, alignItems: "center" }}
        data={favoritesEvents}
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
    </View>
  );
}
