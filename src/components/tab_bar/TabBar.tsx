import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./TabBarIcon";

function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flexDirection: "row", backgroundColor: "white" }}>
      {state.routes.map((route, index) => {
        return (
          <TabBarIcon
            key={route.name}
            navigation={navigation}
            route={route}
            focused={state.index === index}
          />
        );
      })}
    </View>
  );
}

export default TabBar;
