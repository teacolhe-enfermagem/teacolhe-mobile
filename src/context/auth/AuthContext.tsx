import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  userName: string | null,
  signIn: (token: string, refreshToken: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync("access_token");
      const name = await SecureStore.getItemAsync("user_name");
      setUserName(name)
      setIsAuthenticated(!!token);
      setIsLoading(false);
    }
    checkToken();
  }, []);

  async function signOut() {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("user_name");
    setUserName(null);
    setIsAuthenticated(false);
  }

  async function signIn(token: string, refereshToken: string, name: string) {
    await SecureStore.setItemAsync("access_token", token);
    await SecureStore.setItemAsync("refresh_token", refereshToken);
    await SecureStore.setItemAsync("user_name", name);
    setUserName(name);
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userName, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);