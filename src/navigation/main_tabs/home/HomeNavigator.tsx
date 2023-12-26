import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeMainScreen from "../../../screens/home/HomeMainScreen";
import { HomeNavigationParams } from "./types";

const NavigationStack = createNativeStackNavigator<HomeNavigationParams>();

export default function HomeStackNavigator() {
  return (
    <NavigationStack.Navigator>
      <NavigationStack.Screen name="HomeMain" component={HomeMainScreen} />
    </NavigationStack.Navigator>
  );
}
