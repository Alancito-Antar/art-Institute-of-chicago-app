import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { Event } from '../../../services/events/types';

export default function EventInfo({ event }: { event: Event }) {
  const { width } = useWindowDimensions();
  const { title, description } = event;

  const source = {
    html:
      description ||
      `<p style='text-align:center;'>
  Oh no, there was an error!
</p>`,
  };

  return (
    <View>
      <Text style={styles.infoTitleText}>{title}</Text>
      <RenderHTML
        contentWidth={width}
        source={source}
        baseStyle={styles.infoHtmlBaseStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  infoTitleText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  infoHtmlBaseStyle: { color: 'black' },
});
