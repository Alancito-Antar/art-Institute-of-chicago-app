import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventScreen from '../../screens/events/EventScreen';
import MainTabsNavigator from '../main_tabs/MainTabsNavigatior';
import { RootStackParamList } from './types';

const RootNavigationStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootNavigationStack.Navigator
      initialRouteName="MainTabs"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <RootNavigationStack.Group>
        <RootNavigationStack.Screen
          name="MainTabs"
          component={MainTabsNavigator}
          options={() => ({
            headerShown: false,
          })}
        />
      </RootNavigationStack.Group>

      {/* Modals */}
      <RootNavigationStack.Group
        screenOptions={{ presentation: 'fullScreenModal' }}
      >
        <RootNavigationStack.Screen name="EventModal" component={EventScreen} />
      </RootNavigationStack.Group>
    </RootNavigationStack.Navigator>
  );
}
export default RootNavigator;
