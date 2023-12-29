import { Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Event } from '../services/events/types';

export default function EventCard({
  event,
  onPress,
}: {
  event: Event;
  onPress: (id: number) => void;
}) {
  const { id, image_url, short_description } = event;
  const { width } = useWindowDimensions();

  const ITEM_WIDTH = width - 40; // This is getting the whole screen width less the horizontal margins

  return (
    <Pressable
      accessibilityRole="button"
      style={[
        styles.container,
        {
          width: ITEM_WIDTH,
          height: ITEM_WIDTH, // Lets use same width and height to have a square
        },
      ]}
      onPress={() => onPress(id)}
    >
      <FastImage
        style={styles.imageBackgroundContainer}
        source={{ uri: image_url, priority: FastImage.priority.normal }}
        defaultSource={require('../assets/images/img_event_placeholder.png')}
      >
        <LinearGradient
          style={styles.linearGradientContainer}
          colors={['transparent', 'transparent', 'black']}
        >
          {/* For some reason the short description comes as html content, so lets parse it */}
          {short_description ? (
            <Text style={styles.shortDescription} numberOfLines={3}>
              {short_description.replace(/<\/?[^>]+(>|$)/g, '')}
            </Text>
          ) : null}
        </LinearGradient>
      </FastImage>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackgroundContainer: {
    flex: 1,
  },
  linearGradientContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shortDescription: {
    fontWeight: '400',
    fontSize: 14,
    color: 'white',
  },
});
