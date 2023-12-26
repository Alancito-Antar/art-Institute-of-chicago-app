import React from "react";
import { Button, Text, View } from "react-native";
import { useGetEventByIdQuery } from "../../services/events/events";
import { RootNavigationTabParams } from "../../navigation/root/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "../../store/hooks";
import { saveFavoritesData } from "../../store/favorites/favoritesSlice";

export default function EventScreen({
  navigation,
  route: {
    params: { id },
  },
}: RootNavigationTabParams<"EventModal">) {
  const { data: event, isLoading, error } = useGetEventByIdQuery({ id });
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const onSavedPressed = () => {
    if (!event) {
      return;
    }

    dispatch(saveFavoritesData(event));
    navigation.goBack();
  };

  React.useEffect(() => {
    if (isLoading || event) {
      return;
    }

    navigation.goBack();
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text>{event?.title}</Text>
      <Text>Event host: {event?.event_host_title || "Unknown"}</Text>
      <Button title="Save to favorites" onPress={onSavedPressed} />

      {error ? <Text>{JSON.stringify(error)}</Text> : null}
    </View>
  );
}
