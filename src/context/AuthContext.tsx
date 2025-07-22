import type { ReactNode } from 'react';

import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

//import { LogoConagua } from 'src/components/logo/logo-conagua';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, user: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("authToken"));
  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para verificar la validez del token
  const verifyToken = async () => {
    const token = localStorage.getItem("authToken");
    //if (!token) {
      //setIsAuthenticated(false);
      //return;
    //}

    try {
      //prueba con post
      //console.log("Enviando token a la API:", { token });
      const signinResponse = await axios.post("api3/validar_token",{ token}, {
        headers: {
          'Content-Type': 'application/json',}
        });
      if (signinResponse.status == 210) {
        console.log("Token válido")
        setIsAuthenticated(true); // El token es válido
        return;
      } else if (signinResponse.status == 211) {
        setIsAuthenticated(false)
        console.log("Token expirado, vuelva a inciar sesión")
        logout();
      } else if(signinResponse.status == 212){
        setIsAuthenticated(false)
        console.log("Token inválido (y/o modificado)")
        logout();
      } else if (signinResponse.status == 401) {
        console.log("Error de Token inválido, error api auth")
        logout()
      }
    } catch (error) {
      console.error("Error llamando al API, se borrará  el token:", error);
     // console.log("ERROR EN LLAMAR A ", LogoConagua)
      logout(); // Si el token no es válido, cierra la sesión
    }
  };

  const login = (token: string, user: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", user)
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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