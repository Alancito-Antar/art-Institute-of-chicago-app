import { Image, StyleSheet } from "react-native";
import React from "react";
import { Event } from "../../../services/events/types";

export default function EventImage({ event }: { event: Event }) {
  const { image_url } = event;

  return <Image style={styles.eventImage} source={{ uri: image_url }} />;
}

const styles = StyleSheet.create({
  eventImage: {
    height: 400,
    marginBottom: 20,
    borderRadius: 10,
  },
});
