import {
  SectionList,
  SectionListProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useCustomDateLabel from '../hooks/useCustomDateLabel';
import { Event } from '../services/events/types';
import EventCard from './EventCard';

function SectionLabel({ date }: { date: string }) {
  const dateLabel = useCustomDateLabel(date);
  return (
    <View style={styles.sectionLabelContainer}>
      <Text style={styles.sectionLabelText}>{dateLabel}</Text>
    </View>
  );
}

// Little re-usable section list for events so it mantains the same syle for favorites and main screen
// Thought we dont use the API call here so each screen can give the items they want (favorites, or API events)

interface EventsListProps extends SectionListProps<Event> {
  onItemPress: (id: number) => void;
}

// I'll omit here the render item prop so its not require.
export default function EventsList(props: Omit<EventsListProps, 'renderItem'>) {
  const { onItemPress } = props;

  return (
    <SectionList
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
      stickySectionHeadersEnabled
      renderSectionHeader={({ section: { groupDate } }) => (
        <SectionLabel date={groupDate} />
      )}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={onItemPress} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: { padding: 20, gap: 10 },
  sectionLabelContainer: { paddingVertical: 10, backgroundColor: 'white' },
  sectionLabelText: { fontSize: 13, fontWeight: '600', color: 'gray' },
});
