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
      //prueba con post
      interface SignInResponse {
        token: string;
        message:string;
        usuario:string;
      }
  
      // CAMBIAR ESTAS
      const signinResponse = await axios.post<SignInResponse>("api3/auth", token, {
        headers: {
          'Content-Type': 'application/json',}
        });
      if (signinResponse.status == 200) {
        console.log("Token valido")
        setIsAuthenticated(true); // El token es válido
      } else if (signinResponse.status == 201) {
        setIsAuthenticated(false)
        console.log("No hay token mandado")
      } else if (signinResponse.status == 401) {
        console.log("Error de token invalido")
        logout()
      }
    } catch (error) {
      console.error("Error llamando al API:", error);
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