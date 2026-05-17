import { useState } from "react";

interface Message {
  id: string,
  role: "assistant" | "user",
  content: string
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const canSend = prompt.trim().length > 0 && !isLoading;

  const data = isLoading ? [...messages, {id: "loading", role: "assistant" as const, content: "..."}] : messages;

  function handleSend() {
    if (!canSend) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: prompt.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Olá! Sou o assistente do TEAcolhe. Como posso te ajudar?"
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  }

  function handleNewChat() {
    setMessages([]);
    setPrompt("");
    setIsLoading(false);
  }

  return { data, prompt, setPrompt, handleNewChat, canSend, handleSend }
}