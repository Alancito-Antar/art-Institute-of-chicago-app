import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyEventList() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Oh no!</Text>
      <Text style={styles.subtitleText}>
        There where no results! Swipe down to try again!
      </Text>
      <LottieView
        style={styles.lottieView}
        source={require('../../../assets/animations/anim_not_found.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  titleText: { fontSize: 24, fontWeight: '700', color: 'black' },
  subtitleText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: 'gray',
  },
  lottieView: { width: 400, height: 300 },
});
