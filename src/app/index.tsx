import  HomeScreen  from "@/src/features/home/screens/HomeScreen";
import { Redirect } from "expo-router";
import { useAuth } from "../context/auth/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    )
  }

  return isAuthenticated ? <Redirect href="/(protected)/patient/select-level" /> : <HomeScreen />;
}
