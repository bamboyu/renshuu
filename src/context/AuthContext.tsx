import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define the shape of the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  userID: string | null;
  accessToken: string | null;
  setAuth: (token: string | null, userID: string | null) => void;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userID: null,
  accessToken: null,
  setAuth: () => {},
});

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // On component mount, check for existing auth data in localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUserID = localStorage.getItem("userID");

    if (token && storedUserID) {
      setAccessToken(token);
      setUserID(storedUserID);
      setIsAuthenticated(true);
    }
  }, []);

  // Function to update auth state
  const setAuth = (token: string | null, userID: string | null) => {
    setAccessToken(token);
    setUserID(userID);
    setIsAuthenticated(!!token);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userID,
        accessToken,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
