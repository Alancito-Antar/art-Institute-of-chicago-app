import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import { Event } from '../services/events/types';
import EventCard from './EventCard';

// Little re-usable grid for events so it mantains the same syle for favorites and main screen
// Thought we dont use the API call here so each screen can give the items they want (favorites, or API events)

interface EventsGridProps extends FlatListProps<Event> {
  onItemPress: (id: number) => void;
}

// I'll omit here the render item prop so its not require.
export default function EventsGrid(props: Omit<EventsGridProps, 'renderItem'>) {
  const { onItemPress } = props;

  return (
    <FlatList
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
      columnWrapperStyle={styles.columnWrapperStyle}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={styles.separatorContainer} />}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={onItemPress} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: { padding: 20, alignItems: 'center' },
  columnWrapperStyle: { gap: 12 },
  separatorContainer: { height: 20 },
});
