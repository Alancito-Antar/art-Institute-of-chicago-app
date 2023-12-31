import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/tab_bar/TabBar';
import FavoritesStackNavigator from './favorites/FavoritesNavigator';
import HomeStackNavigator from './home/HomeNavigator';
import { MainTabsStackParamList } from './types';

const MainTabsNavigationTabBar =
  createBottomTabNavigator<MainTabsStackParamList>();

function MainTabsNavigator() {
  return (
    <MainTabsNavigationTabBar.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
      })}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
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
