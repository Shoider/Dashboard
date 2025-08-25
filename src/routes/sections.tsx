import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { ProtectedRoute } from 'src/components/ProtectedRoute';
import { RoleProtectedRoute } from 'src/components/RoleProtectedRoute';


// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const UserPage = lazy(() => import('src/pages/user'));
export const VPNPage = lazy(() => import('src/pages/vpn'));
export const InternetPage = lazy(() => import('src/pages/internet'));
export const RFCPage = lazy(() => import('src/pages/rfc'));
 
export const TelefoniaPage = lazy(() => import('src/pages/telefonia'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PageNotAccess = lazy(() => import('src/pages/not-acces'));

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
          <RoleProtectedRoute allowedRoles={['vpn', 'administrador']}>
          {/* <ProtectedRoute> */}
            <VPNPage />
          {/* </ProtectedRoute> */}
          </RoleProtectedRoute>
        ),
      },
      { 
        path: 'internet', 
        element: (
          <RoleProtectedRoute allowedRoles={['internet', 'administrador']}>
          {/* <ProtectedRoute> */}
            <InternetPage />
          {/* </ProtectedRoute> */}
          </RoleProtectedRoute>
        ),
      },
      { 
        path: 'rfc', 
        element: (
          <RoleProtectedRoute allowedRoles={['rfc', 'administrador']}>
          {/* <ProtectedRoute> */}
            <RFCPage />
          {/* </ProtectedRoute> */}
          </RoleProtectedRoute>
        ),
      },
      { 
        path: 'telefonia', 
        element: (
          <RoleProtectedRoute allowedRoles={['telefonia', 'administrador']}>
          {/* <ProtectedRoute> */}
            <TelefoniaPage />
          {/* </ProtectedRoute> */}
          </RoleProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '404',
    element: <Page404 />,
  },
  {
    path: 'denegado',
    element: <PageNotAccess />,
  },
  { path: '*', element: <Page404 /> },
];
