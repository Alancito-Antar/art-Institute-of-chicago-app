import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { RenderHTML } from 'react-native-render-html';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Event } from '../../../services/events/types';

export default function EventActions({ event }: { event: Event }) {
  const inset = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const {
    is_ticketed,
    is_admission_required,
    is_free,
    is_registration_required,
    is_sold_out,
    buy_button_text,
    buy_button_caption,
    rsvp_link,
  } = event;

  const onBuyTicketsPress = () => {
    try {
      Linking.openURL(rsvp_link);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: inset.bottom,
        },
      ]}
    >
      {is_free ? <Text style={styles.eventInfoText}>Free event!</Text> : null}

      {is_sold_out ? <Text style={styles.eventInfoText}>Sold out!</Text> : null}

      {is_ticketed || is_registration_required || is_admission_required ? (
        <View style={styles.eventActionContainer}>
          <View style={styles.eventCaptionContainer}>
            <RenderHTML
              source={{ html: buy_button_caption }}
              contentWidth={width}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            style={styles.eventBuyButtonContainer}
            onPress={onBuyTicketsPress}
          >
            <Text style={styles.eventBuyButtonText}>{buy_button_text}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  eventInfoText: { fontWeight: '600', color: 'black' },
  eventActionContainer: { flexDirection: 'row', alignItems: 'center' },
  eventCaptionContainer: { flex: 1, marginRight: 20 },
  eventBuyButtonContainer: {
    padding: 10,
    backgroundColor: '#B60235',
    borderRadius: 10,
  },
  eventBuyButtonText: { fontWeight: '600', color: 'white' },
});
