import { ScrollView, View, Image, Text, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import EmptyChat from "../components/EmptyChat";
import ChatInput from "../components/ChatInput";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-white">
      <View className="items-center justify-center px-6" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-center ">
          <Pressable className="active:opacity-50 absolute left-0">
            <Image className="w-8 h-8" source={require("@/assets/chat/new-message.png")} />
          </Pressable>
          <Text className="flex-1 text-center text-[#6FCFC7]">TEA<Text className="text-black text-xl">colhe</Text></Text>
        </View>
      </View>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ flexGrow: 1 }} bottomOffset={2}>
        <View className="flex-1 items-center justify-center p-6 gap-5">
          <EmptyChat />
        </View>
        
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
        <View className="w-full p-6 bg-transparent">
          <ChatInput />
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  )
}