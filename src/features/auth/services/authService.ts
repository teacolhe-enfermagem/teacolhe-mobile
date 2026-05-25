import api from "@/src/services/api";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

type UserResponse = {
  name: string;
};

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  async getUser(token: string): Promise<UserResponse> {
  const { data } = await api.get("/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
},
};