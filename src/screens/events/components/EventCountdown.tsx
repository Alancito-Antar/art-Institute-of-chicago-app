import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';
import useTimer from '../../../hooks/useTimer';
import { Event } from '../../../services/events/types';

export default function EventCountdown({
  event,
}: {
  event: Event | undefined;
}) {
  const isEventOngoing = moment(event!.start_date).diff(moment()) > 0; // Lets check if the event has already started or is happening already

  const { days, hours, minutes, seconds, hasEnded } = useTimer(
    isEventOngoing ? event!.start_date : event!.end_date,
  );

  if (hasEnded === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        {hasEnded ? 'Ended' : isEventOngoing ? 'Starts in:' : 'Ending in:'}
      </Text>

      {!hasEnded ? (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownItemText}>{days}d</Text>
          <Text style={styles.countdownItemText}>{hours}h</Text>
          <Text style={styles.countdownItemText}>{minutes}m</Text>
          <Text style={styles.countdownItemText}>{seconds}s</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  headingText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  countdownItemText: {
    color: 'black',
  },
});
