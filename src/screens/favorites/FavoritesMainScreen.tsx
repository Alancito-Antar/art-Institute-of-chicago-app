import { StyleSheet, Text, View } from 'react-native';
import EventsGrid from '../../components/EventsGrid';
import { FavoritesStackScreenProps } from '../../navigation/main_tabs/favorites/types';
import { useAppSelector } from '../../store/hooks';

export default function FavoritesMainScreen({
  navigation,
}: FavoritesStackScreenProps<'FavoritesMain'>) {
  const favoritesEvents = useAppSelector(state => state.favorites.events);

  const onEventPress = (id: number) => {
    // We could add some analytics here and what not.
    navigation.navigate('EventModal', { id });
  };

  return (
    <View style={styles.container}>
      <Text>Favorites</Text>
      <EventsGrid data={favoritesEvents} onItemPress={onEventPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
