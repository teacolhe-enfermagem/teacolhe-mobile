import { View, Text } from "react-native";
import LoadingDots from "./LoadingDots";
import Markdown from "react-native-markdown-display"

interface MessageBubbleProps {
  message: {
    role: "assistant" | "user",
    content: string
  }
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isLoading = message.content === "...";

  return (
    <View className={`${isUser ? 'bg-[#9cbebb] self-end' : 'bg-transparent self-start'} p-4 rounded-xl`} style={{ maxWidth: isUser ? "80%" : "100%" }}>
      {isLoading ? <LoadingDots /> : <Markdown>{message.content}</Markdown>}

      {message.role === "assistant" && !isLoading && (
        <View className="items-center mt-4">
          <View className="h-px bg-gray-300" style={{ width: "95%" }} />
        </View>
      )}
    </View>
  )
}