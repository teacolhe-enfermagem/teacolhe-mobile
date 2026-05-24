import { ScrollView, View, Text, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-[#F3F3F3]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 12, paddingTop: insets.top }}>
        <View className="flex-1 items-center justify-center p-6 gap-5 w-full">
          <View className="justify-center items-center">
            <Image
              source={require("@/assets/chat/logo2.png")}
              className="w-60 h-60"
              resizeMode="contain"
            />

            <Text className="text-center text-black text-2xl">
              Cuidando com empatia,{"\n"}
              acolhendo cada singularidade.
            </Text>
          </View>

          <View className="flex-col w-full gap-5 mt-16">
            <Pressable onPress={() => router.push("/(public)/auth/login") } className="w-full h-14 bg-[#6FCFC7] rounded-full items-center justify-center active:opacity-50">
              <Text className="text-white text-lg">
                Login
              </Text>
            </Pressable>

            <Pressable onPress={() => router.push("/(public)/auth/signup")} className="w-full h-14 border border-[#6FCFC7] rounded-full items-center justify-center active:opacity-40">
              <Text className="text-[#74D4CF] text-lg">
                Cadastre-se
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}