import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { ProtectedRoute } from 'src/components/ProtectedRoute';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const UserPage = lazy(() => import('src/pages/user'));
export const VPNPage = lazy(() => import('src/pages/vpn'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
    children: [
      { index: true, element: <SignInPage /> },
    ],
  },
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { 
        path: 'dashboard', 
        element: (
          <ProtectedRoute>
            <DashboardPage /> 
          </ProtectedRoute>
        ),
        },
      { 
        path: 'user', 
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      { 
        path: 'vpn', 
        element: (
          <ProtectedRoute>
            <VPNPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
