import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';
import { Event } from '../../../services/events/types';

function EventInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.eventInfoRowContainer}>
      <Text style={styles.eventInfoLabelText}>{label}</Text>
      <Text style={styles.eventInfoValueText}>{value}</Text>
    </View>
  );
}

export default function EventHostAndInfo({ event }: { event: Event }) {
  const {
    event_host_title,
    location,
    start_date,
    start_time,
    end_date,
    end_time,
  } = event;
  return (
    <View style={styles.container}>
      <EventInfoRow label="Event host:" value={event_host_title || 'Unknown'} />

      <View>
        <EventInfoRow
          label="From:"
          value={moment(start_date).format('dddd DD - MMM, yyyy')}
        />
        <EventInfoRow
          label="To:"
          value={moment(end_date).format('dddd DD - MMM, yyyy')}
        />
      </View>

      <View>
        <EventInfoRow label="Starts:" value={`${start_time}h`} />
        <EventInfoRow label="Ends:" value={`${end_time}h`} />
      </View>

      <EventInfoRow label="Location:" value={location} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  eventInfoRowContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  eventInfoLabelText: { fontWeight: '600', color: 'black' },
  eventInfoValueText: { color: 'black' },
});
