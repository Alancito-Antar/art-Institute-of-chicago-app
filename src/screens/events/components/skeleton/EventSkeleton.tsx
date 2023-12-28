import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function EventSkeleton() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item gap={20}>
          {/* Countdown */}
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={150}
              height={30}
              marginTop={30}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              gap={20}
              marginHorizontal={20}
            >
              <SkeletonPlaceholder.Item width={50} height={20} />
              <SkeletonPlaceholder.Item width={50} height={20} />
              <SkeletonPlaceholder.Item width={50} height={20} />
              <SkeletonPlaceholder.Item width={50} height={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          {/* Image */}
          <SkeletonPlaceholder.Item
            height={400}
            width={width - 40}
            borderRadius={20}
          />

          {/* Info */}
          <SkeletonPlaceholder.Item gap={10}>
            <SkeletonPlaceholder.Item width={100} height={10} />
            <SkeletonPlaceholder.Item width={100} height={10} />
            <SkeletonPlaceholder.Item width={100} height={10} />
            <SkeletonPlaceholder.Item width={100} height={10} />
            <SkeletonPlaceholder.Item width={100} height={10} />
          </SkeletonPlaceholder.Item>

          {/* Event */}
          <SkeletonPlaceholder.Item gap={10}>
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
            <SkeletonPlaceholder.Item width={width - 40} height={10} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 20,
  },
});
