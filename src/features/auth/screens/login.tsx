import { Text, View, TextInput, Image, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import arrow from "@/assets/auth/Arrow-left.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (

    // Cabeçalho
    <View className="flex-1 bg-[#EDEDED] relative">
      <View className="absolute top-0 left-0 right-0 h-[50%] bg-[#6FCFC7] pt-14 px-6 items-center">
        <Pressable onPress={() => router.back()} className="absolute left-6 top-14 w-10 h-10 items-center justify-center active:opacity-60"><Image source={arrow} className="w-6 h-6" style={{ tintColor: '#ffffff' }} /></Pressable>
        <Text className="text-white text-4xl font-medium text-center mt-24">Login</Text>
      </View>

      {/* Card */}

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="bg-[#EDEDED] w-[340px] h-[405px] rounded-[20px] border border-[#C0C0C0] pt-12 pb-10 px-6 shadow-sm absolute top-[280px] left-1/2 -ml-[170px] flex-col justify-start gap-4">
          <TextInput placeholder="Email" placeholderTextColor="#A8A8A8" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} className="bg-[#EFEFEF] px-4 py-2.5 rounded-xl border border-[#C0C0C0] text-slate-800 text-base mb-6" />
          <TextInput placeholder="Senha" placeholderTextColor="#A8A8A8" secureTextEntry value={password} onChangeText={setPassword} className="bg-[#EFEFEF] px-4 py-2.5 rounded-xl border border-[#C0C0C0] text-slate-800 text-base" />

          {/* Checkbox */}

          <Pressable className="flex-row items-center pl-1 active:opacity-80 mt-6">
            <View className="w-5 h-5 rounded border border-[#C0C0C0] bg-white mr-3 justify-center items-center">
              {remember && <View className="w-2.5 h-2.5 rounded bg-[#6FCFC7]" />}
            </View>
            <Text className="text-[#606060] text-sm">Me Lembre</Text>
          </Pressable>


          {/* Botão de login */}

          <Pressable onPress={() => router.replace("/patient/select-level")} className="bg-[#6FCFC7] py-3 rounded-xl items-center justify-center active:opacity-90 active:scale-[0.98] transition-all shadow-sm mt-auto">
            <Text className="text-white font-inter text-xl">Entrar</Text>
          </Pressable>

          {/* Link de cadastro */}

          <View className="flex-row justify-center items-center">
            <Text className="text-[#303030] text-sm">Não tem uma conta?</Text>
            <Pressable onPress={() => router.push("/auth/login")} className="ml-1 active:opacity-70">
              <Text className="text-[#6FCFC7] font-semibold text-sm"> Cadastre-se</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
