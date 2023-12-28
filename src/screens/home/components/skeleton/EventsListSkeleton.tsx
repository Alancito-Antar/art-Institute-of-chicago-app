import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function EventsListItemSkeleton() {
  const { width } = useWindowDimensions();
  const ITEM_WIDTH = width - 40;

  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={150}
          height={5}
          paddingVertical={10}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width={ITEM_WIDTH}
          height={ITEM_WIDTH}
          borderRadius={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

export default function EventsListSkeleton() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {[0, 1, 2, 3].map(x => (
        <EventsListItemSkeleton key={x} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    gap: 20,
    padding: 20,
  },
});
