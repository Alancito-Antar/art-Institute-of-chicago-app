import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesMainScreen from '../../../screens/favorites/FavoritesMainScreen';
import { FavoritesNavigationParams } from './types';

const NavigationStack = createNativeStackNavigator<FavoritesNavigationParams>();

export default function FavoritesStackNavigator() {
  return (
    <NavigationStack.Navigator screenOptions={{ headerShown: false }}>
      <NavigationStack.Screen
        name="FavoritesMain"
        component={FavoritesMainScreen}
      />
    </NavigationStack.Navigator>
  );
}
