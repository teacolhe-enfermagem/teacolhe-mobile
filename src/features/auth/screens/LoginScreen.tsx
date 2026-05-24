import { useState } from "react";
import { ScrollView, Text, View, TextInput, Image, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { authService } from "../services/authService";
import { useAuth } from "@/src/context/auth/AuthContext";
import { loginSchema } from "../schemas/loginSchema";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardStickyView } from "react-native-keyboard-controller";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { signIn } = useAuth();

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setEmailError(errors.email?.[0] ?? "");
      setPasswordError(errors.password?.[0] ?? "");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const { access_token, refresh_token } = await authService.login({
        email,
        password
      });
      await signIn(access_token, refresh_token);
      router.replace("/(protected)/patient/select-level");
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? "Erro ao relizar o login.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-[#EDEDED]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 12 }}>
        <View className="flex-1 bg-[#EDEDED] relative">
          <View style={{ height: 360, paddingTop: insets.top }} className="bg-[#6FCFC7] px-6 items-center">
            <Pressable onPress={() => router.back()} className="absolute left-6 top-14 w-10 h-10 items-center justify-center active:opacity-60">
              <Image source={require("@/assets/auth/Arrow-left.png")} className="w-6 h-6" style={{ tintColor: "#ffffff" }} />
            </Pressable>
            <Text className="text-white text-4xl font-medium text-center mt-24">Login</Text>
          </View>

          <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
            <View className="flex-1 items-center">
              <View className="bg-[#EDEDED] w-[90%] max-w-[340px] min-h-[405px] rounded-[20px] border border-[#C0C0C0] pt-12 pb-10 px-6 shadow-sm flex-col justify-start gap-4 -mt-24">
                <TextInput placeholder="Email" placeholderTextColor="#A8A8A8" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(t) => { setEmail(t); setEmailError(""); }} className={`bg-[#EFEFEF] px-4 py-2.5 rounded-xl border text-slate-800 text-base ${emailError ? "border-red-500" : "border-[#C0C0C0]"}`} />
                {emailError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{emailError}</Text> : null}
                
                <TextInput placeholder="Senha" placeholderTextColor="#A8A8A8" secureTextEntry value={password} onChangeText={(t) => { setPassword(t); setPasswordError(""); }} className={`bg-[#EFEFEF] px-4 py-2.5 rounded-xl border text-slate-800 text-base ${passwordError ? "border-red-500" : "border-[#C0C0C0]"}`} />
                {passwordError ? <Text className="text-red-500 text-xs mt-[-10px] pl-1">{passwordError}</Text> : null}

                {/* Checkbox */}
                <Pressable onPress={() => setRemember(!remember)} className="flex-row items-center pl-1 active:opacity-80 mt-2">
                  <View className="w-5 h-5 rounded border border-[#C0C0C0] bg-white mr-3 justify-center items-center">
                    {remember && <View className="w-2.5 h-2.5 rounded bg-[#6FCFC7]" />}
                  </View>
                  <Text className="text-[#606060] text-sm">Me Lembre</Text>
                </Pressable>

                {apiError ? <Text className="text-red-500 text-xs pl-1">{apiError}</Text> : null}

                {/* Botão de login */}
                <Pressable onPress={handleLogin} className={`${loading ? 'bg-[#a8e8e5]': 'bg-[#6ED7D3] active:opacity-90 active:scale-[0.98]'} py-3 rounded-xl items-center justify-center active:opacity-90 active:scale-[0.98] transition-all shadow-sm mt-auto`}>
                  <Text className="text-white font-inter text-xl">Entrar</Text>
                </Pressable>

                {/* Link de cadastro */}
                <View className="flex-row justify-center items-center">
                  <Text className="text-[#303030] text-sm">Não tem uma conta?</Text>
                  <Pressable onPress={() => router.push("/auth/signup")} className="ml-1 active:opacity-70">
                    <Text className="text-[#6FCFC7] font-semibold text-sm"> Cadastre-se</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardStickyView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
