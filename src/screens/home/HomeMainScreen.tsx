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

export default function HomeMainScreen({
  navigation,
}: HomeStackScreenProps<"HomeMain">) {
  const { width } = useWindowDimensions();
  const { data: events, isLoading, error } = useGetEventsQuery();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={events?.data}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("EventModal", { id: item.id })}
          >
            <Image
              style={{ width: width / 2, height: 100 }}
              source={{ uri: item.image_url }}
            />
            {/* <Text>{item.title}</Text> */}
            <Text>{item.short_description}</Text>
          </Pressable>
        )}
      />

      {error ? <Text>{JSON.stringify(error)}</Text> : null}
    </View>
  );
}
