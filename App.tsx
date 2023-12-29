import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import useCachedResources from './src/hooks/useCachedResources';
import useNotifee from './src/hooks/useNotifee';
import RootNavigator from './src/navigation/root/RootNavigatior';
import { store } from './src/store/store';

export default function App() {
  useNotifee();

  const isLoadingComplete = useCachedResources();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

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
