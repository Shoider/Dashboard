import axios from 'axios';
import { useState, useCallback, useEffect, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
//import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
//import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import Alerts from 'src/components/alerts';
import { Iconify } from 'src/components/iconify';
//import { resolve } from 'path';
// eslint-disable-next-line react-hooks/rules-of-hooks

// ----------------------------------------------------------------------
// eslint-disable-next-line react-hooks/rules-of-hooks   

export function SignInView() {

  const [formData, setFormData] = useState({
    emailInput:'',
    passwordInput:'',
  });


  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
    //const signinResponse = await axios.post("http://127.0.0.1:8001/api3/auth", formData, {
    const signinResponse = await axios.post("/api3/auth", formData, {
      responseType: "blob",
    });

    if (signinResponse.status === 201) {
      // Redirigir al usuario al dashboard
      setAlert({
        message: "Inicio de sesión exitoso.",
        severity: "success",
      });
      setOpenAlert(true);
      console.log("Inicio exitoso")
      router.push("/dashboard");

    } else if (signinResponse.status === 202) {
      setAlert({
        message: "Correo y/o Contraseña Incorrectos.",
        severity: "error",
      });
      setOpenAlert(true);
      console.log("Contraseña Incorrecta")

    } else if (signinResponse.status === 203) {
      setAlert({
        message: "Correo y/o Contraseña Incorrectos.",
        severity: "error",
      });
      setOpenAlert(true);
      console.log("Cuenta Incorrecta")
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
        //defaultValue="hello@gmail.com"
        onChange={handleChange}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: false },
        }}
      />

      <TextField
        fullWidth
        id='passwordInput'
        name="passwordInput"
        label="Constraseña"
        //defaultValue="@demo1234"
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        slotProps={{
          inputLabel: { shrink: false },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
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
