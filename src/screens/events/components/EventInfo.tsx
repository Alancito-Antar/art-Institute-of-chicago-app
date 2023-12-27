import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { Event } from "../../../services/events/types";
import RenderHTML from "react-native-render-html";

export default function EventInfo({ event }: { event: Event }) {
  const { width } = useWindowDimensions();
  const { title, description } = event;

  const source = {
    html:
      description ||
      `<p style='text-align:center;'>
  Oh no, there was an error!
</p>`,
  };

  return (
    <View>
      <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: "700" }}>
        {title}
      </Text>

      <RenderHTML contentWidth={width} source={source} />
    </View>
  );
}
