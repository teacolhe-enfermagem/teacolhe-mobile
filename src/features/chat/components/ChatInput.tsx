import { View, TextInput, Pressable, Image } from "react-native"
import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState<string>("");
  const canSend = message.trim().length > 0;
  
  return (
    <View className="flex flex-row items-center justify-center w-full gap-2">
      <TextInput
        className="flex-1 border border-gray-300 rounded-2xl bg-white py-3"
        placeholder="Digite sua mensagem"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      <Pressable disabled={!canSend} className={`bg-[#6FCFC7] items-center justify-center rounded-md p-2 ${canSend ? 'active:opacity-55' : undefined}`}>
        <Image className="w-6 h-6" source={require("@/assets/chat/send.png")} />
      </Pressable>
    </View>
  )
}