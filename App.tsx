import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigator from "./src/navigation/root/RootNavigatior";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import useCachedResources from "./src/hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
