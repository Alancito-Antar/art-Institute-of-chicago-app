/* eslint-disable react-native/no-inline-styles */
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabBarIconProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  route: { name: string; key: string };
  focused: boolean;
}

export default function TabBarIcon(props: TabBarIconProps) {
  const { navigation, route, focused } = props;

  const insets = useSafeAreaInsets();

  let iconSource;

  switch (route.name) {
    case 'Home':
      iconSource = require('../../assets/icons/tab_bar/ic_home.png');
      break;
    case 'Favorites':
      iconSource = require('../../assets/icons/common/ic_favorites.png');
      break;
    default:
      iconSource = undefined;
      break;
  }

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!focused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate(route.name);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
      onPress={onPress}
    >
      <Image
        style={[
          styles.iconImage,
          {
            tintColor: focused ? '#B60235' : 'gray',
          },
        ]}
        source={iconSource}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      {focused ? <View style={styles.selectedBubble} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  selectedBubble: {
    width: 5,
    height: 5,
    marginTop: 5,
    backgroundColor: '#B60235',
    borderRadius: 2.5,
  },
});
