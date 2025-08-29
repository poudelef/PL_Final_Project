import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "Tenant" | "Landlord";
type User = { id: string; name: string; email: string; role: Role };

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (data: { user: User; token?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restore auth on refresh
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const rawToken = localStorage.getItem("token");
    if (rawUser) setUser(JSON.parse(rawUser));
    if (rawToken) setToken(rawToken);
  }, []);

  const login: AuthState["login"] = ({ user, token }) => {
    setUser(user);
    if (token) setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    if (token) localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({ isAuthenticated: !!user, user, token, login, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
