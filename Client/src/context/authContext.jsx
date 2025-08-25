import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roleId, setRoleId] = useState(() => localStorage.getItem('roleId'));
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
    if(roleId){
      localStorage.setItem('roleId', roleId);
    } else {
      localStorage.removeItem('roleId');
    }
  }, [token, roleId]);

  const login = (jwt,roleId) => {
    setRoleId(roleId);
    setToken(jwt);
  };

  const logout = () =>{
    setRoleId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);