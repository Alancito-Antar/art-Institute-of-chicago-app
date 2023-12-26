import React from "react";
import * as Font from "expo-font";
import { loadFavoritesData } from "../store/favorites/favoritesSlice";
import { store } from "../store/store";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Favorites
        await store.dispatch(loadFavoritesData());

        // await store.dispatch(loadFeatureFlags());
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
