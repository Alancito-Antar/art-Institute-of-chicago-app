import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useGetEventByIdQuery } from "../../services/events/events";
import { RootNavigationTabParams } from "../../navigation/root/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RenderHTML from "react-native-render-html";
import EventHeader from "./components/EventHeader";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import EventCountdown from "./components/EventCountdown";

export default function EventScreen({
  navigation,
  route: {
    params: { id },
  },
}: RootNavigationTabParams<"EventModal">) {
  const insets = useSafeAreaInsets();
  // Lets handle y scroll offset to animate header
  const offset = useSharedValue(0);

  const { width } = useWindowDimensions();

  const { data: event, isLoading, error } = useGetEventByIdQuery({ id });

  const source = {
    html:
      event?.description ||
      `<p style='text-align:center;'>
  Oh no, there was an error!
</p>`,
  };

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (e) => {
        offset.value = e.contentOffset.y;
      },
    },
    []
  );

  React.useEffect(() => {
    if (isLoading || event) {
      return;
    }

    navigation.goBack();
  }, []);

  if (!event) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <EventHeader event={event} offsetY={offset} />

      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        onScroll={scrollHandler}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <EventCountdown event={event} />

          {/* Add countdown */}

          <Image
            style={{
              height: 400,
              width: width - 40,
              marginBottom: 20,
              borderRadius: 10,
            }}
            source={{ uri: event?.image_url }}
          />

          {/* Host info */}
          <View style={{ marginBottom: 20 }}>
            <Text>Event host: {event?.event_host_title || "Unknown"}</Text>
          </View>

          {/* Event info */}
          <View>
            <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: "700" }}>
              {event?.title}
            </Text>

            <RenderHTML contentWidth={width} source={source} />
          </View>

          {error ? <Text>{JSON.stringify(error)}</Text> : null}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
});
