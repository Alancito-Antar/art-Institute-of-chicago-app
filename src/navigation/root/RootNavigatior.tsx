import EventScreen from "../../screens/events/EventScreen";
import HomeStackNavigator from "../main_tabs/home/HomeNavigator";
import { RootStackParamList } from "./types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          component={HomeStackNavigator}
          options={() => ({
            headerShown: false,
          })}
        />
      </RootNavigationStack.Group>

      {/* Modals */}
      <RootNavigationStack.Group
        screenOptions={{ presentation: "fullScreenModal" }}
      >
        <RootNavigationStack.Screen name="EventModal" component={EventScreen} />
      </RootNavigationStack.Group>
    </RootNavigationStack.Navigator>
  );
}
export default RootNavigator;
