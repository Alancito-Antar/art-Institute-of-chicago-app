import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigator from "./src/navigation/root/RootNavigatior";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
