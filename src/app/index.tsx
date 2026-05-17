import { Text, View } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {

  return <Redirect href={"/chat"} />

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
