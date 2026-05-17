import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

type PatientCardBackgroundColor = "#6CE568" | "#F5E453" | "#EE4D4D";

interface PatientCardProps {
  level: string,
  backgroundColor: PatientCardBackgroundColor,
  description: string
}

export default function PatientCard({ level, backgroundColor, description }: PatientCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push({
        pathname: "/chat",
        params: { level }
      })}
      className="flex-row items-center w-full gap-5 border border-gray-400 rounded-2xl px-6 py-8 active:opacity-50"
    >
      <View className="rounded-full items-center justify-center w-28 h-28" style={{ backgroundColor: backgroundColor }}>
        <Text className="text-white text-4xl">{level}</Text>
      </View>

      <View className="flex-1 flex-col gap-1 shrink">
        <Text className="text-xl" adjustsFontSizeToFit>Nível {level}</Text>
        <Text className="text-sm opacity-70 pr-2 text-start shrink" adjustsFontSizeToFit>{description}</Text>
      </View>
    </Pressable>
  )
}