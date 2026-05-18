import { useState } from "react";
import { chatService } from "../services/chatService";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

export const useChat = (level: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number | null>(null);

  const canSend = prompt.trim().length > 0 && !isLoading;

  const data = isLoading
    ? [...messages, { id: "loading", role: "assistant" as const, content: "..." }]
    : messages;

  // converte o formato da API pro formato interno
  function toMessage(apiMsg: { id: number; sender: "user" | "ai"; content: string }): Message {
    return {
      id: apiMsg.id.toString(),
      role: apiMsg.sender === "ai" ? "assistant" : "user",
      content: apiMsg.content,
    };
  }

  async function handleSend() {
    if (!canSend) return;

    const text = prompt.trim();
    setPrompt("");
    setIsLoading(true);

    // otimista: mostra a mensagem do usuário imediatamente
    const optimisticMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      console.log("[LOG] Enviando para:", `/chat/`);
      console.log("[LOG] Payload:", { nivel_chat: level, message: text });

      if (!chatId) {
        // primeira mensagem → cria o chat
        const response = await chatService.createChat({
          nivel_chat: level,
          message: text,
        });

        setChatId(response.id);
        setMessages(response.messages.map(toMessage));
      } else {
        // mensagens seguintes → envia no chat existente
        const response = await chatService.sendMessage(chatId, { message: text });
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimisticMessage.id), // remove otimista
          ...response.messages.map(toMessage),
        ]);
      }
    } catch (err: any) {
      console.log("[ERROR]: Erro no chat:", err.response?.data);
      console.log("[ERROR]: Status:", err.response?.status);
      console.log("[ERROR]: Mensagem:", err.message);
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setPrompt("");
    setIsLoading(false);
    setChatId(null);
  }

  return { data, prompt, setPrompt, handleNewChat, canSend, handleSend };
};