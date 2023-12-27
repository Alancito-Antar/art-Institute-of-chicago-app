import React from "react";
import {
  ActivityIndicator,
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
import EventImage from "./components/EventImage";
import EventHost from "./components/EventHostAndInfo";
import EventInfo from "./components/EventInfo";
import EventActions from "./components/EventActions";
import EventHostAndInfo from "./components/EventHostAndInfo";

export default function EventScreen({
  navigation,
  route: {
    params: { id },
  },
}: RootNavigationTabParams<"EventModal">) {
  const insets = useSafeAreaInsets();
  // Lets handle y scroll offset to animate header
  const offset = useSharedValue(0);

  const {
    data: event,
    isLoading,
    isFetching,
    error,
  } = useGetEventByIdQuery({ id });

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

  if (isLoading || isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <EventHeader offsetY={offset} />
        <ActivityIndicator color="#B60235" />
      </View>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <View style={styles.container}>
      <EventHeader event={event} offsetY={offset} />
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom + 100 },
        ]}
        onScroll={scrollHandler}
      >
        <View style={styles.contentContainer}>
          {error ? <Text>{JSON.stringify(error)}</Text> : null}

          <EventCountdown event={event} />
          <EventImage event={event} />
          <EventHostAndInfo event={event} />
          <EventInfo event={event} />
        </View>
      </Animated.ScrollView>
      <EventActions event={event} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});
