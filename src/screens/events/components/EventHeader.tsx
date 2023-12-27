import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../store/hooks";
import { saveFavoritesData } from "../../../store/favorites/favoritesSlice";
import { Event } from "../../../services/events/types";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventHeader({
  event,
  offsetY,
}: {
  event: Event | undefined;
  offsetY: SharedValue<number>;
}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const animatedStyles = useAnimatedStyle(() => {
    // Just animate on and off, when we scroll > 0
    const opacity = withTiming(offsetY.value > 0 ? 1 : 0, {
      duration: 250,
    });

    return {
      opacity,
    };
  });

  const onSavedPressed = () => {
    if (!event) {
      return;
    }

    dispatch(saveFavoritesData(event));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* The animated view will change the opacity of the BG */}
      <Animated.View style={[styles.animatedViewContainer, animatedStyles]} />
      <Pressable onPress={navigation.goBack}>
        <Image
          style={styles.backButtonImage}
          source={require("../../../assets/icons/event/ic_chevron_left.png")}
        />
      </Pressable>
      <Pressable onPress={onSavedPressed}>
        <Image
          style={styles.backButtonImage}
          source={require("../../../assets/icons/common/ic_favorites.png")}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    zIndex: 10,
  },
  animatedViewContainer: {
    position: "absolute",
    height: 100,
    left: 0,
    right: 0,
    zIndex: -10,
    backgroundColor: "white",
  },
  backButtonImage: {
    width: 20,
    height: 20,
    tintColor: "#B60235",
  },
});
