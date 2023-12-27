import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Event } from "../../../services/events/types";
import moment from "moment";

function EventInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Text style={{ fontWeight: "600" }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

export default function EventHostAndInfo({ event }: { event: Event }) {
  const {
    event_host_title,
    location,
    start_date,
    start_time,
    end_date,
    end_time,
  } = event;
  return (
    <View style={styles.container}>
      <EventInfoRow label="Event host:" value={event_host_title || "Unknown"} />

      <View>
        <EventInfoRow
          label="From:"
          value={moment(start_date).format("dddd DD - MMM, yyyy")}
        />
        <EventInfoRow
          label="To:"
          value={moment(end_date).format("dddd DD - MMM, yyyy")}
        />
      </View>

      <View>
        <EventInfoRow label="Starts:" value={`${start_time}h`} />
        <EventInfoRow label="Ends:" value={`${end_time}h`} />
      </View>

      <EventInfoRow label="Location:" value={location} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    gap: 10,
  },
});
