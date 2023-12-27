import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventsGrid from '../../components/EventsGrid';
import { processFavoritesEvents } from '../../helpers/events';
import { FavoritesStackScreenProps } from '../../navigation/main_tabs/favorites/types';
import { useAppSelector } from '../../store/hooks';

export default function FavoritesMainScreen({
  navigation,
}: FavoritesStackScreenProps<'FavoritesMain'>) {
  const favoritesEvents = useAppSelector(state => state.favorites.events);
  const insets = useSafeAreaInsets();

  const onEventPress = (id: number) => {
    // We could add some analytics here and what not.
    navigation.navigate('EventModal', { id });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <EventsGrid
        sections={processFavoritesEvents(favoritesEvents)}
        onItemPress={onEventPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
