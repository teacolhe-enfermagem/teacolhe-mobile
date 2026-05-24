import { Modal, View, Text, Pressable, Image } from "react-native"

interface LogoutModalProp {
  visible: boolean,
  onClose: () => void,
  onConfirm: () => void;
}

export default function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProp) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        <View className="w-full bg-white items-center justify-center gap-4 p-6 rounded-xl overflow-hidden">
          <Image className="w-24 h-24" source={require("@/assets/patient/alert.png")} />
          <Text className="text-3xl">Sair da conta</Text>
          <Text className="opacity-70">Você realmente deseja sair da sua conta?</Text>

          <View className="flex-row w-full items-center justify-center gap-5 mt-6">
            <Pressable onPress={onClose} className="flex-1 items-center justify-center border border-gray-400 p-3 rounded-lg active:opacity-45">
              <Text className="text-lg">Cancelar</Text>
            </Pressable>

            <Pressable onPress={onConfirm} className="bg-red-500 p-3 flex-1 items-center justify-center rounded-lg active:opacity-55">
              <Text className="text-white text-lg">Sair</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}