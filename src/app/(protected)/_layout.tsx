import { useAuth } from "@/src/context/auth/AuthContext";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    )
  }

  console.log("ProtectedLayout renderizou — isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) return <Redirect href="/" />

  return <Slot />
}