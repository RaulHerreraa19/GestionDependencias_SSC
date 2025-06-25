import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isAuthenticated, setAuthenticated] = useState(!!token);

  useEffect(() => {
    if(token){
      localStorage.setItem('token', token);
      setAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      setAuthenticated(false);
    }
  }, [token]);

  const login = (jwt) => {
    setToken(jwt);
  };

  const logout = () =>{
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);