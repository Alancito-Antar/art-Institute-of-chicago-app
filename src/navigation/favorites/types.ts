import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationTabParams } from "../root/types";

export type FavoritesNavigationParams = {
  FavoritesMain: undefined;
  // More favorites stack screens we liked to add
};

export type FavoritesStackScreenProps<
  Screen extends keyof FavoritesNavigationParams
> = CompositeScreenProps<
  NativeStackScreenProps<FavoritesNavigationParams, Screen>,
  RootNavigationTabParams<"Favorites">
>;
