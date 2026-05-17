import { View, Image, Text } from "react-native";

export default function EmptyChat() {
  return (
    <View className="items-center justify-center w-full gap-5">
      <View className="flex bg-[#6FCFC7] rounded-full items-center justify-center">
        <Image className="w-16 h-16" source={require("@/assets/chat/logo.png")} />
      </View>
      <Text className="text-black text-center text-2xl">Bem vindo Cleytinho, estou a sua disposição</Text>
    </View>
  )
}