import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { authService } from "@/src/features/auth/services/authService";
import { useAuth } from "@/src/context/auth/AuthContext";
import { signupSchema } from "../schemas/signupSchema";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignupScreen() {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSignup = async () => {
    const result = signupSchema.safeParse({ name, email, password, confirmPassword, accepted });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setNameError(errors.name?.[0] ?? "");
      setEmailError(errors.email?.[0] ?? "");
      setPasswordError(errors.password?.[0] ?? "");
      setConfirmPasswordError(errors.confirmPassword?.[0] ?? "");
      setTermsError(errors.accepted?.[0] ?? "");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const { access_token, refresh_token } = await authService.register({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      });
      await signIn(access_token, refresh_token, name);
      router.replace("/(protected)/patient/select-level");
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

          <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
            <View className="w-[90%] max-w-[360px] self-center mt-20 mb-8 rounded-[22px] border border-[#CFCFCF] bg-[#F3F3F3] px-6 py-8 shadow-sm flex-col gap-4">

              <TextInput placeholder="Nome" placeholderTextColor="#B7B7B7" value={name} onChangeText={(t) => { setName(t); setNameError(""); }} className={`h-[54px] rounded-xl border bg-transparent px-4 text-[#333] ${nameError ? "border-red-500" : "border-[#CFCFCF]"}`} />
              {nameError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{nameError}</Text> : null}

              <TextInput placeholder="Email" placeholderTextColor="#B7B7B7" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(t) => { setEmail(t); setEmailError(""); }} className={`h-[54px] rounded-xl border bg-transparent px-4 text-[#333] ${emailError ? "border-red-500" : "border-[#CFCFCF]"}`} />
              {emailError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{emailError}</Text> : null}

              <View className={`h-[54px] flex-row items-center rounded-xl border bg-transparent ${passwordError ? "border-red-500" : "border-[#CFCFCF]"}`}>
                <TextInput
                  placeholder="Senha"
                  placeholderTextColor="#B7B7B7"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(t) => { setPassword(t); setPasswordError(""); }}
                  className="flex-1 h-full px-4 text-[#333]"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="px-3 justify-center items-center active:opacity-60">
                  <Image
                    source={showPassword ? require("@/assets/auth/eye-open.png") : require("@/assets/auth/eye-closed.png")}
                    className="w-5 h-5"
                    style={{ tintColor: "#5a5a5a" }}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{passwordError}</Text> : null}

              <View className={`h-[54px] flex-row items-center rounded-xl border bg-transparent ${confirmPasswordError ? "border-red-500" : "border-[#CFCFCF]"}`}>
                <TextInput
                  placeholder="Confirmar senha"
                  placeholderTextColor="#B7B7B7"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={(t) => { setConfirmPassword(t); setConfirmPasswordError(""); }}
                  className="flex-1 h-full px-4 text-[#333]"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="px-3 justify-center items-center active:opacity-60">
                  <Image
                    source={showConfirmPassword ? require("@/assets/auth/eye-open.png") : require("@/assets/auth/eye-closed.png")}
                    className="w-5 h-5"
                    style={{ tintColor: "#5a5a5a" }}
                  />
                </TouchableOpacity>
              </View>
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
          </KeyboardStickyView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}