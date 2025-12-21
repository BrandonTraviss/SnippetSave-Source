import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// send cookies automatically
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Prevents flicker on refresh
  const [loading, setLoading] = useState(true);

  // Fetch user on first load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  // Login Function
  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });
    setUser(res.data.user);
    return res.data;
  };
    //   Register Function
    const register = async(username,email,password) =>{
        const res = await axios.post("/api/auth/register",{
            username,
            email,
            password
        });
        setUser(res.data.user);
        return res.data;
    }
  // Logout function
  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >{children}</AuthContext.Provider>
  );
}

export function useAuth(){
    return useContext(AuthContext);
}
