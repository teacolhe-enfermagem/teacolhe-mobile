import { View, Text, TouchableOpacity, Image } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#F3F3F3] items-center justify-start pt-80 px-6">
      
      {/* Logo */}
      <Image
        source={require("@/assets/chat/logo2.png")}
        className="w-60 h-60 mb-2"
        resizeMode="contain"
      />


      {/* Subtítulo */}
      <Text className="text-center text-black text-[20px] leading-6 mb-72">
        Cuidando com empatia,{"\n"}
        acolhendo cada singularidade.
      </Text>

      {/* Botão Login */}
      <TouchableOpacity className="w-full h-14 bg-[#6FCFC7] rounded-full items-center justify-center mb-4">
        <Text className="text-white text-base font-medium">
          Login
        </Text>
      </TouchableOpacity>

      {/* Botão Cadastro */}
      <TouchableOpacity className="w-full h-14 border border-[#6FCFC7] rounded-full items-center justify-center">
        <Text className="text-[#74D4CF] text-base font-medium">
          Cadastre-se
        </Text>
      </TouchableOpacity>

    </View>
  );
}