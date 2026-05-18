import api from "@/src/services/api";

type CreateChatPayload = {
  nivel_chat: string;
  message: string;
};

type SendMessagePayload = {
  message: string;
};

type ApiMessage = {
  id: number;
  chat_id: number;
  sender: "user" | "ai";
  content: string;
  created_at: string;
};

type ChatResponse = {
  id: number;
  autism_level: string;
  status: string;
  messages: ApiMessage[];
};

type SendMessageResponse = {
  messages: ApiMessage[];
};

export const chatService = {
  async createChat(payload: CreateChatPayload): Promise<ChatResponse> {
    const { data } = await api.post<ChatResponse>("/chat/", payload);

    return data;
  },

  async sendMessage(chatId: number, payload: SendMessagePayload): Promise<SendMessageResponse> {
    const { data } = await api.post<SendMessageResponse>(`/chat/${chatId}/messages`, payload);
    
    return data;
  },
};