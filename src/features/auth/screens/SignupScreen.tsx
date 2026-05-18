import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { authService } from "@/src/features/auth/services/authService";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("O nome é obrigatório.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("O e-mail é obrigatório.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("A senha é obrigatória.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirmação de senha é obrigatória.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!accepted) {
      setTermsError("Você deve aceitar os termos.");
      isValid = false;
    } else {
      setTermsError("");
    }

    return isValid;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      await authService.register({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      });

      const token = await SecureStore.getItemAsync("access_token");
      router.replace("/patient/select-level");
      
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F3F3F3]">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
          <View className="px-6 mt-3 pt-4 flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center active:opacity-60">
              <Image source={require("@/assets/auth/Arrow-left-blue.png")} />
            </TouchableOpacity>
          </View>

          <View className="items-center mt-32">
            <Text className="text-[38px] font-inter font-medium text-[#6fcfc7]">Cadastre-se</Text>
          </View>

          <View className="w-[90%] max-w-[360px] self-center mt-20 mb-8 rounded-[22px] border border-[#CFCFCF] bg-[#F3F3F3] px-6 py-8 shadow-sm flex-col gap-4">
            <TextInput placeholder="Nome" placeholderTextColor="#B7B7B7" value={name} onChangeText={(t) => { setName(t); setNameError(""); }} className={`h-[54px] rounded-xl border bg-transparent px-4 text-[#333] ${nameError ? "border-red-500" : "border-[#CFCFCF]"}`} />
            {nameError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{nameError}</Text> : null}

            <TextInput placeholder="Email" placeholderTextColor="#B7B7B7" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(t) => { setEmail(t); setEmailError(""); }} className={`h-[54px] rounded-xl border bg-transparent px-4 text-[#333] ${emailError ? "border-red-500" : "border-[#CFCFCF]"}`} />
            {emailError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{emailError}</Text> : null}

            <TextInput placeholder="Senha" placeholderTextColor="#B7B7B7" secureTextEntry value={password} onChangeText={(t) => { setPassword(t); setPasswordError(""); }} className={`h-[54px] rounded-xl border bg-transparent px-4 text-[#333] ${passwordError ? "border-red-500" : "border-[#CFCFCF]"}`} />
            {passwordError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{passwordError}</Text> : null}

            <TextInput placeholder="Confirmar senha" placeholderTextColor="#B7B7B7" secureTextEntry value={confirmPassword} onChangeText={(t) => { setConfirmPassword(t); setConfirmPasswordError(""); }} className={`h-[54px] rounded-xl border bg-transparent px-4 text-[#333] ${confirmPasswordError ? "border-red-500" : "border-[#CFCFCF]"}`} />
            {confirmPasswordError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{confirmPasswordError}</Text> : null}

            <TouchableOpacity onPress={() => { setAccepted(!accepted); setTermsError(""); }} className="flex-row items-center pl-1 active:opacity-80">
              <View className={`w-5 h-5 border mr-3 bg-white justify-center items-center rounded ${termsError ? "border-red-500" : "border-[#CFCFCF]"}`}>
                {accepted && <View className="w-2.5 h-2.5 rounded bg-[#6ED7D3]" />}
              </View>
              <Text className="text-[14px] text-[#666]">Aceitar termos</Text>
            </TouchableOpacity>
            {termsError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{termsError}</Text> : null}

            {apiError ? <Text className="text-red-500 text-xs pl-1">{apiError}</Text> : null}

            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              className={`h-[54px] rounded-xl items-center justify-center mt-2 ${loading ? "bg-[#a8e8e5]" : "bg-[#6ED7D3] active:opacity-90 active:scale-[0.98]"}`}
            >
              <Text className="text-white text-[24px] font-medium">
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Text>
            </TouchableOpacity>

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