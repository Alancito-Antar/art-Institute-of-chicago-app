import React from "react";
import { Text, View } from "react-native";
import { useGetEventByIdQuery } from "../../services/events/events";
import { RootNavigationTabParams } from "../../navigation/root/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventScreen({
  navigation,
  route: {
    params: { id },
  },
}: RootNavigationTabParams<"EventModal">) {
  const { data: event, isLoading, error } = useGetEventByIdQuery({ id });
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if (isLoading || event) {
      return;
    }

    navigation.goBack();
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text>{event?.title}</Text>
      {error ? <Text>{JSON.stringify(error)}</Text> : null}
    </View>
  );
}
