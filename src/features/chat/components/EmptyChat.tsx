import { View, Image, Text } from "react-native";
import { useAuth } from "@/src/context/auth/AuthContext";

export default function EmptyChat() {
  const { userName } = useAuth();
  
  return (
    <View className="items-center justify-center w-full gap-5">
      <View className="flex bg-[#6FCFC7] rounded-full items-center justify-center">
        <Image className="w-16 h-16" source={require("@/assets/chat/logo.png")} />
      </View>
      <Text className="text-black text-center text-2xl">Bem vindo {userName ?? ""}, estou a sua disposição</Text>
    </View>
  )
}