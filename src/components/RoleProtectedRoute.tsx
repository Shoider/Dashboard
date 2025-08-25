// src/components/RoleProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/context/AuthContext';

type RoleProtectedRouteProps = {
  allowedRoles: string[]; // Ej: ['vpn', 'admin']
  children: React.ReactNode;
};

export function RoleProtectedRoute({ allowedRoles, children }: RoleProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  // user.tipoUsuario debe contener el privilegio (ej: 'vpn', 'rfc', 'admin', etc.)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user || (!allowedRoles.includes(user.tipoUsuario) && user.tipoUsuario !== 'admin')) {
    // Si no tiene el privilegio ni es admin, redirige a 404 o a donde prefieras
    return <Navigate to="/denegado" replace />;
  }

  return <>{children}</>;
}