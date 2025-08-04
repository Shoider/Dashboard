import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { LogoConagua } from 'src/components/logo/logo-conagua';

// ----------------------------------------------------------------------

export function NotFoundView() {
  return (
    <>
      <LogoConagua sx={{ position: 'fixed', top: 20, left: 20 }} />
      
      <Container
        sx={{
          py: 10,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          ¡Lo sentimos, página no encontrada!
        </Typography>

        <Typography sx={{ color: 'text.secondary', maxWidth: 480, textAlign: 'center' }}>
          Lo sentimos, no pudimos encontrar la página que buscas.
          Quizás cometiste un error al ingresar la URL, verifica tu ortografía.        
        </Typography>
        😔📶🔧💻
        

        <Box
          component="img"
          src="/assets/illustrations/illustration-404.png"
          sx={{
            width: 320,
            height: 'auto',
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button component={RouterLink} href="/dashboard" size="large" variant="contained" color="inherit">
          Ir al inicio
        </Button>
      </Container>
    </>
  );
}
