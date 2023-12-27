import { Image, StyleSheet } from 'react-native';
import { Event } from '../../../services/events/types';

export default function EventImage({ event }: { event: Event }) {
  const { image_url } = event;

  return (
    <Image
      style={styles.eventImage}
      source={{ uri: image_url }}
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  eventImage: {
    height: 400,
    borderRadius: 10,
  },
});
