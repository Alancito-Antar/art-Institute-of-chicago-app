import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainTabsStackParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type MainTabsNavigationParams<
  Screen extends keyof MainTabsStackParamList
> = NativeStackScreenProps<MainTabsStackParamList, Screen>;
