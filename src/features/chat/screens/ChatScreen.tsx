import { FlatList, View, Image, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import EmptyChat from "../components/EmptyChat";
import MessageBubble from "../components/MessageBubble";
import { useChat } from "../hooks/useChat"
import { useLocalSearchParams } from "expo-router";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { level } = useLocalSearchParams<{ level: string }>();
  const { data, prompt, setPrompt, handleNewChat, canSend, handleSend } = useChat(level);
  
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      <View className="px-6" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-between w-full">
          <Pressable
            onPress={handleNewChat} className="active:opacity-50">
            <Image className="w-8 h-8" source={require("@/assets/chat/new-message.png")} />
          </Pressable>
          <Text className="text-center text-[#6FCFC7]" pointerEvents="none">TEA<Text className="text-black text-xl">colhe</Text></Text>

          <View className="w-8" />
        </View>
      </View>

      <FlatList
        data={data}
        className="flex-1"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-6">
            <EmptyChat />
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        contentContainerClassName="p-6 gap-4"
        showsVerticalScrollIndicator={false}
      />
        
      <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
        <View className="w-full p-6 bg-transparent">
          <View className="flex flex-row items-center justify-center w-full gap-2">
            <TextInput
              className="flex-1 border border-gray-300 rounded-2xl bg-white py-3"
              placeholder="Digite sua mensagem"
              value={prompt}
              onChangeText={(text) => setPrompt(text)}
            />
      
            <Pressable onPress={handleSend} disabled={!canSend} className={`bg-[#6FCFC7] items-center justify-center rounded-md p-2 ${canSend ? 'active:opacity-55' : undefined}`}>
              <Image className="w-6 h-6" source={require("@/assets/chat/send.png")} />
            </Pressable>
          </View>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  )
}