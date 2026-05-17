import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";
import arrow from "@/assets/auth/Arrow-left-blue.png";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F3F3F3]">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
          {/* Cabeçalho */}
          <View className="px-6 mt-3 pt-4 flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center active:opacity-60">
              <Image source={arrow} />
            </TouchableOpacity>
          </View>

          {/* Título */}
          <View className="items-center mt-32">
            <Text className="text-[38px] font-inter font-medium text-[#6fcfc7]">Cadastre-se</Text>
          </View>

          {/* Card */}
          <View className="w-[90%] max-w-[360px] self-center mt-20 mb-8 rounded-[22px] border border-[#CFCFCF] bg-[#F3F3F3] px-6 py-8 shadow-sm flex-col gap-4">
            <TextInput placeholder="Nome" placeholderTextColor="#B7B7B7" value={name} onChangeText={setName} className="h-[54px] rounded-xl border border-[#CFCFCF] bg-transparent px-4 text-[#333]" />
            <TextInput placeholder="Email" placeholderTextColor="#B7B7B7" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} className="h-[54px] rounded-xl border border-[#CFCFCF] bg-transparent px-4 text-[#333]" />
            <TextInput placeholder="Senha" placeholderTextColor="#B7B7B7" secureTextEntry value={password} onChangeText={setPassword} className="h-[54px] rounded-xl border border-[#CFCFCF] bg-transparent px-4 text-[#333]" />
            <TextInput placeholder="Confirmar senha" placeholderTextColor="#B7B7B7" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} className="h-[54px] rounded-xl border border-[#CFCFCF] bg-transparent px-4 text-[#333]" />

            <TouchableOpacity onPress={() => setAccepted(!accepted)} className="flex-row items-center pl-1 active:opacity-80">
              <View className="w-5 h-5 border border-[#CFCFCF] mr-3 bg-white justify-center items-center rounded">
                {accepted && <View className="w-2.5 h-2.5 rounded bg-[#6ED7D3]" />}
              </View>
              <Text className="text-[14px] text-[#666]">Aceitar termos</Text>
            </TouchableOpacity>

            {/* Botão */}
            <TouchableOpacity onPress={() => router.replace("/patient/select-level")} className="h-[54px] rounded-xl bg-[#6ED7D3] items-center justify-center active:opacity-90 active:scale-[0.98] transition-all mt-2">
              <Text className="text-white text-[24px] font-medium">Cadastrar</Text>
            </TouchableOpacity>

            {/* Link de login */}
            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-[13px] text-[#222]">Já tem uma conta?</Text>
              <TouchableOpacity onPress={() => router.push("/auth/login")} className="ml-2 active:opacity-70">
                <Text className="text-[13px] font-semibold text-[#6ED7D3]">Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}