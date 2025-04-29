import 'src/global.css';

import { useEffect } from 'react';

import Fab from '@mui/material/Fab';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();
{/**SE  PODRIA UTILIZAR PARA PONER UN BOTON QUE DIRIGIA A "SOLICITUDES" */}
  const githubButton = () => (
    <Fab
      size="medium"
      aria-label="Formulario"
      href="http://172.29.206.227:8006"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 70,
        height: 70,
        position: 'fixed',
        bgcolor: 'grey.800',
      }}
    >
      <Iconify width={48} icon="fluent:form-24-filled" sx={{ '--color': 'black' }} />
    </Fab>
  );

  return (
    <ThemeProvider>
      {children}
      {githubButton()}
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
