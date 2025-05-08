import type { ReactNode } from 'react';

import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para verificar la validez del token
  const verifyToken = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      // Llamada a la API para verificar el token
      await axios.get('/api3/protected', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setIsAuthenticated(true); // El token es válido
    } catch (error) {
      console.error("Token inválido o expirado:", error);
      logout(); // Si el token no es válido, cierra la sesión
    }
  };

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}