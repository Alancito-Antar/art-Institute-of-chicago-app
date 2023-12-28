import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export default function InlineError({
  containerStyle,
  message,
  isLoading,
  isError,
  refetch,
}: {
  containerStyle?: ViewStyle;
  isLoading: boolean;
  isError: boolean;
  message: string;
  refetch: () => void;
}) {
  if (isLoading) return null;
  if (!isError) return null;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        minimumFontScale={1}
        maxFontSizeMultiplier={2}
        style={styles.errorText}
      >
        {message}
      </Text>
      <Pressable
        style={styles.buttonContainer}
        accessibilityRole="button"
        onPress={refetch}
      >
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#B60235',
  },
  buttonText: {
    fontWeight: '500',
    color: 'white',
  },
  errorText: {
    flex: 1,
    fontWeight: '600',
    color: 'black',
  },
});
