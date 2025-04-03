import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../api/services/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const fetchedUser = await AuthService.getUser();
        setUser(fetchedUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const userData = await AuthService.login(email, password);
      setUser(userData);
      return true;
    } catch(e) {
      console.log(e);
      return false;
    }
  };


  const handleRegister = async (name, email, password) => {
    try {
      const userData = await AuthService.register(name, email, password);
      setUser(userData);
      return true;
    } catch (e){
      console.log(e);
      return false;
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await AuthService.logout();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
