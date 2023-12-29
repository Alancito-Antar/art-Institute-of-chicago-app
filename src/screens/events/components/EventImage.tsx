import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Event } from '../../../services/events/types';

export default function EventImage({ event }: { event: Event }) {
  const { image_url } = event;

  return (
    <FastImage
      style={styles.eventImage}
      source={{ uri: image_url, priority: FastImage.priority.high }}
      defaultSource={require('../../../assets/images/img_event_placeholder.png')}
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
