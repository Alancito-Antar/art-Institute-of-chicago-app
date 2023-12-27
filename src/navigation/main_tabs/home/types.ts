import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigationTabParams } from '../../root/types';
import { MainTabsNavigationParams } from '../types';

export type HomeNavigationParams = {
  HomeMain: undefined;
  // More home stack screens we liked to add
};

export type HomeStackScreenProps<Screen extends keyof HomeNavigationParams> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeNavigationParams, Screen>,
    CompositeScreenProps<
      RootNavigationTabParams<'MainTabs'>,
      MainTabsNavigationParams<'Home'>
    >
  >;
