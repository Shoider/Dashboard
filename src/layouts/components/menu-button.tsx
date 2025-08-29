import type { IconButtonProps } from '@mui/material/IconButton';

import { Box} from "@mui/material";
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
{/*MENU DE OPCIONES DE LA IZQUIERDA*/}
export function MenuButton({ sx, ...other }: IconButtonProps) {
  return (
    <Box
                  sx={{
                    position:"relative",
                    width: "100%",
                    height:"100%",
                    backgroundImage: "url('/fondo.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                   //backgroundRepeat: "no-repeat"
                    //display: { xs: "none", md: "block" }, // Mostrar solo en pantallas pequeñas
                  }}
                >
    <IconButton sx={sx} {...other}>
      <Iconify icon="custom:menu-duotone" width={26} />
    </IconButton>
    </Box>
  );
}
