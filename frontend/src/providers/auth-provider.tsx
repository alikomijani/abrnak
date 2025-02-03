import { Tokens, User } from "@/api/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  login: (tokens: Tokens, user: User) => void;
  logout: () => void;
}
const initValue: AuthContext = {
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};
const AuthContext = createContext(initValue);

const isLogin = (): boolean => {
  const storedUser = JSON.parse(localStorage.getItem("user") as string);
  const storedToken = localStorage.getItem("refreshToken");
  return storedUser && storedToken;
};
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(isLogin());
  // Check if the user is authenticated on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") as string);
    const storedToken = localStorage.getItem("refreshToken");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (tokens: Tokens, userData: User) => {
    console.log(tokens, userData);
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
