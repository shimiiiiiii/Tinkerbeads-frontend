import React, { createContext, useState, useEffect, useContext } from 'react';
import { initDatabase, storeToken, getToken, deleteToken } from '../utils/sqliteToken';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      await initDatabase(); 

      const storedToken = await getToken(); 
      console.log('Debug: Retrieved Token from SQLite ->', storedToken);
      
      if (storedToken?.token) {
        try {
          const decodedUser = jwtDecode(storedToken.token); 
          console.log("Decoded User from Token:", decodedUser);

          setToken(storedToken.token);
          setUser(decodedUser); 
        } catch (error) {
          console.error("Invalid token:", error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadToken();
  }, []);

  const login = async (jwtToken, userData) => {
    console.log("Login userData:", JSON.stringify(userData, null, 2));

    const decodedUser = jwtDecode(jwtToken);
    console.log("Decoded User:", decodedUser);

    setToken(jwtToken);
    setUser(decodedUser); 

    await storeToken(jwtToken, decodedUser.id, Date.now() + 7 * 24 * 60 * 60 * 1000); 
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await deleteToken(); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);