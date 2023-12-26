import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationTabParams } from "../root/types";

export type HomeNavigationParams = {
  HomeMain: undefined;
  // More home stack screens we liked to add
};

export type HomeStackScreenProps<Screen extends keyof HomeNavigationParams> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeNavigationParams, Screen>,
    RootNavigationTabParams<"Home">
  >;
