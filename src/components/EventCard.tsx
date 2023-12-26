import React from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";
import { Event } from "../services/events/types";
import RenderHtml from "react-native-render-html";

export default function EventCard({
  event,
  onPress,
}: {
  event: Event;
  onPress: (id: number) => void;
}) {
  const { id, image_url, short_description } = event;
  const { width } = useWindowDimensions();

  const ITEM_WIDTH = width / 2 - 20; // This is getting the whole screen width and dividing it by two (and substracting the padding)

  return (
    <Pressable
      style={{
        width: ITEM_WIDTH,
        height: ITEM_WIDTH, // Lets use same width and height to have a square
        borderRadius: 20,
        overflow: "hidden",
      }}
      onPress={() => onPress(id)}
    >
      <ImageBackground
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        source={{ uri: image_url }}
      >
        {/* For some reason the short description comes as html content, so lets parse it */}
        {short_description ? (
          <Text style={{ fontSize: 14, color: "white" }} numberOfLines={3}>
            {short_description.replace(/<\/?[^>]+(>|$)/g, "")}
          </Text>
        ) : null}
      </ImageBackground>
    </Pressable>
  );
}
