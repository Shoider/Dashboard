import type { ChangeEvent } from 'react';

import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
//import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
//import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
//import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

//import useAuth from './src/context/authContext';
// eslint-disable-next-line import/no-unresolved
import { useAuth } from 'src/context/AuthContext'
//import { Iconify } from 'src/components/iconify';
//import { resolve } from 'path';

import Alerts from 'src/components/alerts';
 

// ----------------------------------------------------------------------
 

export function SignInView() {

  const [formData, setFormData] = useState({
    emailInput:'',
    passwordInput:'',
  });

  const { login } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const router = useRouter();
  const [showPassword] = useState(false);
  const [alert, setAlert] = useState({
      message: "",
      severity: "",
    });
  const [openAlert, setOpenAlert] = useState(false);

  // Llamada API
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Validar que los campos no estén vacíos
    if (!formData.emailInput || !formData.passwordInput) {
      setAlert({
        message: "Por favor, complete todos los campos requeridos.",
        severity: "error",
      });
      setOpenAlert(true);
      return;
    }

  console.log("Datos enviados a la API: ", formData);

  try {
    // Llamada a la API
    interface SignInResponse {
      token: string;
    }

    // CAMBIAR ESTAS
    const signinResponse = await axios.post<SignInResponse>("api3/auth", formData, {
      headers: {
      'Content-Type': 'application/json',
      },
    });

    if (signinResponse.status === 201) {
      // Redirigir al usuario al dashboard
      setAlert({
        message: "Inicio de sesión exitoso.",
        severity: "success",
      });
      setOpenAlert(true);
      const token = signinResponse.data.token;
      login(token, formData.emailInput);
      console.log("Inicio exitoso, Token:", token)
      console.log("Contenido de la respuesta:", signinResponse)
      router.push("/dashboard");

    } else if (signinResponse.status === 202) {
      setAlert({
        message: "Usuario y/o Contraseña Incorrectos.",
        severity: "error",
      });
      setOpenAlert(true);
      console.log("Contraseña Incorrecta")

    } else if (signinResponse.status === 203) {
      setAlert({
        message: "Usuario y/o Contraseña Incorrectos.",
        severity: "error",
      });
      setOpenAlert(true);
      console.log("Usuario Incorrecto")
    } else {
      setAlert({
        message: "Error al iniciar sesión. Por favor, intente nuevamente.",
        severity: "error",
      });
      setOpenAlert(true);
      console.log("Algo esta mal")
    }

  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    setAlert({
      message: "Ocurrió un error al procesar su solicitud.",
      severity: "error",
    });
    setOpenAlert(true);
  }
    };

  /* const handleSignIn = useCallback(() => {
   
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;

    if (emailInput && passwordInput) {
      router.push('/dashboard');
    }
    else{setAlert({
      //message: 'Por favor, complete todos los campos requeridos: ' + alertaValidacion[1],
      message: "Usuario y/o Constraseña incorrectos.",
      severity: "error",
    });
    setOpenAlert(true);
    }
  }, [router]); */

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        id='emailInput'
        name="emailInput"
        label="Usuario"
        //defaultValue="none"
        placeholder="Ingrese su usuario"
        onChange={handleChange}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        id='passwordInput'
        name="passwordInput"
        label="Constraseña"
        placeholder="Ingrese su contraseña"
        //defaultValue="@demo1234"
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSubmit}
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} pos="up" />

        
        <Typography variant="h5">Sign in</Typography>
        {/*<Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>*/}
      </Box>
      {renderForm}
      {/*<Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>*/}
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        
        {/*<IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>*/}
      </Box>
    </>
    
  );
}
