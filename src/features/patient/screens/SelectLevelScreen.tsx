import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PatientCard from "../components/PatientCard";

export default function SelectLevelScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ paddingBottom: insets.bottom + 12, paddingTop: insets.top }}>
        <View className="items-center justify-center p-6 w-full">
          <View className="items-center justify-center mb-10">
            <Text className="text-3xl text-center px-8">Escolha o nível do paciente</Text>
          </View>

          <View className="gap-10">
            <PatientCard level={"1"} backgroundColor={"#6CE568"} description={"Precisa de pouco suporte e possui maior autonomia."} />
            <PatientCard level={"2"} backgroundColor={"#F5E453"} description={"Necessita de suporte moderado para comunicação e rotina."} />
            <PatientCard level={"3"} backgroundColor={"#EE4D4D"} description={"Requer suporte intenso e acompanhamento contínuo."} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}