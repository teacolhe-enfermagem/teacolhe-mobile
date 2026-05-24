import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync("access_token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    }
    checkToken();
  }, []);

  async function signOut() {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    setIsAuthenticated(false);
  }

  async function signIn(token: string, refereshToken: string) {
    await SecureStore.setItemAsync("access_token", token);
    await SecureStore.setItemAsync("refresh_token", refereshToken);
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);