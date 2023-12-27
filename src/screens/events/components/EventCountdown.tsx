import { View, Text } from "react-native";
import React from "react";
import { Event } from "../../../services/events/types";
import { useTimer } from "../../../hooks/useTimer";

export default function EventCountdown({
  event,
}: {
  event: Event | undefined;
}) {
  const { days, hours, minutes, seconds, hasEnded } = useTimer(
    event!!.end_date
  );

  return (
    <View
      style={{
        marginTop: 30,
        marginBottom: 20,
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 24, fontWeight: "700" }}>
        {hasEnded ? "Ended" : "Ending in:"}
      </Text>
      {!hasEnded ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Text>{days}d</Text>
          <Text>{hours}h</Text>
          <Text>{minutes}m</Text>
          <Text>{seconds}s</Text>
        </View>
      ) : null}
    </View>
  );
}
