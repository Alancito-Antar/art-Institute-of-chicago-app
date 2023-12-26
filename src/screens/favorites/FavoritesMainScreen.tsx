import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";

export default function FavoritesMainScreen() {
  const favoritesEvents = useAppSelector((state) => state.favorites.events);

  return (
    <View>
      <Text>Favorites</Text>
      <FlatList
        data={favoritesEvents}
        renderItem={({ item }) => (
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.image_url }}
            />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
