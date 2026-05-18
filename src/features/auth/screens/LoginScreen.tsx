import { useState } from "react";
import { Text, View, TextInput, Image, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let isValid = true;
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
    return isValid;
  };

  const handleLogin = () => {
    if (validate()) {
      router.replace("/patient/select-level");
    }
  };

  return (

    // Cabeçalho
    <View className="flex-1 bg-[#EDEDED] relative">
      <View className="absolute top-0 left-0 right-0 h-[50%] bg-[#6FCFC7] pt-14 px-6 items-center">
        <Pressable onPress={() => router.back()} className="absolute left-6 top-14 w-10 h-10 items-center justify-center active:opacity-60">
          <Image source={require("@/assets/auth/Arrow-left.png")} className="w-6 h-6" style={{ tintColor: "#ffffff" }} />
        </Pressable>
        <Text className="text-white text-4xl font-medium text-center mt-24">Login</Text>
      </View>

      {/* Card */}

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="absolute top-[280px] left-0 right-0 items-center">
          <View className="bg-[#EDEDED] w-[90%] max-w-[340px] min-h-[405px] rounded-[20px] border border-[#C0C0C0] pt-12 pb-10 px-6 shadow-sm flex-col justify-start gap-4">
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

            {/* Botão de login */}

            <Pressable onPress={handleLogin} className="bg-[#6FCFC7] py-3 rounded-xl items-center justify-center active:opacity-90 active:scale-[0.98] transition-all shadow-sm mt-auto">
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
      </KeyboardAvoidingView>
    </View>
  );
}
