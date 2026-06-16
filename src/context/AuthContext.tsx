import { createContext, useContext, useEffect, useState } from "react";
import { refreshAccessToken } from "../services/authService";
type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  loginUser: (accessToken: string, user: User) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
  };

  const logoutUser = () => {
    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await refreshAccessToken();

        setAccessToken(data.accessToken);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const isAuthenticated = !!accessToken;

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        loginUser,
        logoutUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
