import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "../home/HomeNavigator";
import FavoritesStackNavigator from "../favorites/FavoritesNavigator";
import { RootStackParamList } from "./types";

const RootNavigationTabBar = createBottomTabNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootNavigationTabBar.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        // headerStyle: {
        //   backgroundColor: tw.color("white"),
        // },
        // headerTintColor: tw.color("gray-900"),
        // headerTitleStyle: tw.style(h6TextStyle),
        // // headerBackTitle: 'Back',
        // headerBackTitleStyle: {
        //   color: tw.color("gray-900"),
        // },
        // lazy: false,
      })}
      // tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    >
      <RootNavigationTabBar.Screen
        name="Home"
        component={HomeStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />

      <RootNavigationTabBar.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
    </RootNavigationTabBar.Navigator>
  );
}
export default RootNavigator;
