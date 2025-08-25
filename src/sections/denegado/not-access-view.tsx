import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { LogoConagua } from 'src/components/logo/logo-conagua';

// ----------------------------------------------------------------------

export function NotAccessView() {
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
          ¡No cuentas con acceso!
        </Typography>

        <Typography sx={{ color: 'text.secondary', maxWidth: 480, textAlign: 'center' }}>
          Lo sentimos, no puedes acceder a esta sección.
          Verifica los privilegios que tiene tu cuenta.        
        </Typography>
        
        

        <Box
          component="img"
          src="/assets/illustrations/ilustration-403.png"
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
