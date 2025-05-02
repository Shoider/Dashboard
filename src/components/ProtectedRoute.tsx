import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import { useAuth } from 'src/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}