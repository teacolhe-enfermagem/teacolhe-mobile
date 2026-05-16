import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import "@/global.css";
import { useEffect } from "react";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold
  })

  useEffect(() => {
    NavigationBar.setButtonStyleAsync("dark");
  }, []);
  
  if (!fontsLoaded) return null;
  
  return (
    <>
      <StatusBar style="dark" />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
