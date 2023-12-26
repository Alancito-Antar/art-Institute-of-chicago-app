import AsyncStorage from "@react-native-async-storage/async-storage";
import { Event } from "../../services/events/types";

const FavoritesStorageKey = "favorites";

// Save favorites events to storage
export async function saveFavoritesDataToStorage(updatedFavorites: Event[]) {
  return AsyncStorage.setItem(
    FavoritesStorageKey,
    JSON.stringify(updatedFavorites)
  );
}

// Load the favorites events from storage
export async function loadFavoritesDataFromStorage() {
  const json = await AsyncStorage.getItem(FavoritesStorageKey);
  if (!json) return undefined;
  return JSON.parse(json) as Event[];
}

// Delete the favorites events from storage
export async function clearFavoritesDataFromStorage() {
  return AsyncStorage.removeItem(FavoritesStorageKey);
}
