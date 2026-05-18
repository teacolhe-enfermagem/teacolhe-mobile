import  HomeScreen  from "@/src/features/home/screens/HomeScreen";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/auth/signup" />;
  
  return <HomeScreen />;
}
