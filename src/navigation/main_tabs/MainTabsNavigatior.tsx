import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./home/HomeNavigator";
import FavoritesStackNavigator from "./favorites/FavoritesNavigator";
import { MainTabsStackParamList } from "./types";

const MainTabsNavigationTabBar =
  createBottomTabNavigator<MainTabsStackParamList>();

function MainTabsNavigator() {
  return (
    <MainTabsNavigationTabBar.Navigator
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
      <MainTabsNavigationTabBar.Screen
        name="Home"
        component={HomeStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />

      <MainTabsNavigationTabBar.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
    </MainTabsNavigationTabBar.Navigator>
  );
}
export default MainTabsNavigator;
