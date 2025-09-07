// It uses React Context to share authentication data
// (user, token, expiration time, etc.) across all components in your app.

// Is the user logged in?
// Who is the user?
// When does their session expire?
// How do we log them in or out?

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";

type Role = "Tenant" | "Landlord";
type User = { id: string; name: string; email: string; role: Role };

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  hydrated: boolean;
  expiresAt: number | null;
  login: (data: { user: User; token?: string }) => void;
  logout: () => void;
};

const EXPIRE_MS = 1 * 60 * 60 * 1000; // 1 hours
const AuthContext = createContext<AuthState | null>(null);
//  createContext is like the box that hold auth information
//  any component can open the box using useAuth() and see if user is logged in or not

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const logoutTimerRef = useRef<number | null>(null);

  // Clear any existing logout timer
  const clearLogoutTimer = () => {
    if (logoutTimerRef.current !== null) {
      window.clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  // Whenever token or expiry changes, reset the auto-logout timer
  const scheduleAutoLogout = useCallback((expiry: number | null) => {
    clearLogoutTimer();
    if (!expiry) return;
    const msLeft = expiry - Date.now();
    if (msLeft <= 0) {
      // Already expired; perform logout on next tick
      // (avoids running logout during render)
      setTimeout(() => logout(), 0);
      return;
    }
    logoutTimerRef.current = window.setTimeout(() => {
      logout(); // session over
    }, msLeft);
  }, []);

  // useEffect in React Hook lets you run side effect in a component
  // side effects= anything that happens outside the normal rendering of the component
  // like fetching data from an API, setting up a subscription, or manually changing the DOM

  //  Without useEffect, component can only render UI. with useEffect, we can make it do things after render
  //  Basic Syntax:
  // useEffect(()=>{
  //    // logic
  //    return ()=>{
  //      // cleanup logic
  //    };
  // }. [dependencies])

  // here we use useEffect to restore auth state from localStorage when the component mounts

  // Restore auth on refresh
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const rawToken = localStorage.getItem("token");
    const rawExpiry = localStorage.getItem("expiresAt");

    if (rawUser) {
      try {
        setUser(JSON.parse(rawUser));
      } catch {}
    }
    if (rawToken) setToken(rawToken);
    if (rawExpiry) setExpiresAt(Number(rawExpiry));
    setHydrated(true);
  }, []);

  // After hydration or any change to expiresAt, ensure it’s valid and schedule timer
  useEffect(() => {
    if (!hydrated) return;

    // If we have an expiry and it's in the past, force logout
    if (expiresAt && expiresAt <= Date.now()) {
      logout();
      return;
    }

    // Otherwise schedule the auto-logout
    scheduleAutoLogout(expiresAt);

    // Clean up timer on unmount or when rescheduling
    return clearLogoutTimer;
  }, [hydrated, expiresAt, scheduleAutoLogout]);
  //  this useEffect runs whenever 'hydrated' or 'expiresAt' changes
  // they are dependencies of this effect

  const login: AuthState["login"] = ({ user, token }) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
    } else {
      // If you prefer clearing token when not provided:
      // setToken(null);
      // localStorage.removeItem("token");
    }

    const newExpiry = Date.now() + EXPIRE_MS;
    setExpiresAt(newExpiry);
    localStorage.setItem("expiresAt", String(newExpiry));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    clearLogoutTimer();
  };

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      token,
      hydrated,
      expiresAt,
      login,
      logout,
    }),
    [user, token, hydrated, expiresAt, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// useAuth() is a custom hook that lets components easily access auth info
// Example usage:
// const { isAuthenticated, user, login, logout } = useAuth();
//  we can check is the user is logged in, and call login() or logout() to change state
