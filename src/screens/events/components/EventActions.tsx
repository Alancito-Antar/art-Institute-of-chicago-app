import {
  View,
  Text,
  Pressable,
  Linking,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Event } from "../../../services/events/types";
import { RenderHTML } from "react-native-render-html";

export default function EventActions({ event }: { event: Event }) {
  const inset = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const {
    is_ticketed,
    is_admission_required,
    is_after_hours,
    is_free,
    is_member_exclusive,
    is_registration_required,
    is_sold_out,
    buy_button_text,
    buy_button_caption,
    rsvp_link,
  } = event;

  const onBuyTicketsPress = () => {
    try {
      Linking.openURL(rsvp_link);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: inset.bottom,
        paddingTop: 20,
        backgroundColor: "white",
      }}
    >
      {is_free ? (
        <Text style={{ fontWeight: "600", color: "black" }}>Free event!</Text>
      ) : null}

      {is_sold_out ? (
        <Text style={{ fontWeight: "600", color: "white" }}>Sold out!</Text>
      ) : null}

      {is_ticketed || is_registration_required || is_admission_required ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <RenderHTML
              source={{ html: buy_button_caption }}
              contentWidth={width}
            />
          </View>

          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#B60235",
              borderRadius: 10,
            }}
            onPress={onBuyTicketsPress}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>
              {buy_button_text}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
