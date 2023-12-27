import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Event } from "../../../services/events/types";
import { useTimer } from "../../../hooks/useTimer";
import moment from "moment";

export default function EventCountdown({
  event,
}: {
  event: Event | undefined;
}) {
  const isEventOngoing = moment(event!!.start_date).diff(moment()) > 0; // Lets check if the event has already started or is happening already

  const { days, hours, minutes, seconds, hasEnded } = useTimer(
    isEventOngoing ? event!!.start_date : event!!.end_date
  );

  if (hasEnded === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {hasEnded ? "Ended" : isEventOngoing ? "Starts in:" : "Ending in:"}
      </Text>

      {!hasEnded ? (
        <View style={styles.countdownContainer}>
          <Text>{days}d</Text>
          <Text>{hours}h</Text>
          <Text>{minutes}m</Text>
          <Text>{seconds}s</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
  },
  heading: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
  },
  countdownContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
});
