import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@shared/schema";
import { apiRequest } from "./queryClient";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get user from server first (for cross-browser persistence)
    const tryServerAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem('beastfit_user', JSON.stringify(data.user));
        } else {
          // Fallback to localStorage
          const savedUser = localStorage.getItem('beastfit_user');
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch (error) {
              localStorage.removeItem('beastfit_user');
            }
          }
        }
      } catch (error) {
        // Fallback to localStorage if server is unreachable
        const savedUser = localStorage.getItem('beastfit_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            localStorage.removeItem('beastfit_user');
          }
        }
      }
      setIsLoading(false);
    };

    tryServerAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiRequest('POST', '/api/auth/login', { email, password });
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('beastfit_user', JSON.stringify(data.user));
  };

  const register = async (userData: any) => {
    const response = await apiRequest('POST', '/api/auth/register', userData);
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('beastfit_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('beastfit_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
