import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyFavoritesEventList() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Weeelllll......</Text>
      <Text style={styles.subtitleText}>
        Time go go back to the main screen and get some favoritesss, goooo!
      </Text>
      <LottieView
        style={styles.lottieView}
        source={require('../../../assets/animations/anim_favorites.json')}
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
