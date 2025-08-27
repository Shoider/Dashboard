import axios from 'axios';
import { useState } from 'react';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Alerts from 'src/components/alerts'; 
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UserTableToolbar({ numSelected, filterName, onFilterName }: UserTableToolbarProps) {
  const [alert, setAlert] = useState({
          message: "",
          severity: "",
        });
      const [openAlert, setOpenAlert] = useState(false);
  // Nueva función para manejar la descarga de csv
  const handleDownload2 = (async () => {
    console.log("Clic en boton descargar CSV");
    try {
      const response = await axios.post(
        "/api2/v1/telFiltrado",
      );

      setAlert({
        message: `Generando CSV`,
        severity: "warning",
      });
      setOpenAlert(true);

      if (response.status === 200) {
        console.log("Datos obtenidos del filtro en mongodb: ", response.data);
        const items = Array.isArray(response.data) ? response.data : [response.data];
        if (items.length === 0) {
          setAlert({
            message: "No hay datos para exportar",
            severity: "info",
          });
          setOpenAlert(true);
          return;
        }
        const headers = Object.keys(items[0]);
        const csvRows = [
          headers.join(","), // encabezados
          ...items.map(row =>
            headers.map(field => {
              let value = row[field] ?? "";
              // Si el valor es un objeto, lo convertimos a string
              if (typeof value === "object" && value !== null) {
                // Si es un objeto vacío, dejar vacío
                if (Object.keys(value).length === 0) {
                  value = "";
                } else {
                  // Unir todos los valores del objeto en una sola cadena
                  value = Object.values(value).join(", ");
                }
              }
              // Escapa comillas dobles
              return `"${String(value).replace(/"/g, '""')}"`;
            }).join(",")
          ),
        ];
        const csvString = csvRows.join("\r\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = 'TELEFONIA_DATOS.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setAlert({
          message: "CSV descargado correctamente",
          severity: "success",
        });
        setOpenAlert(true);
      } else {
        console.error("Ocurrió un error al generar el CSV");
        console.error(response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        message: "Ocurrió un error al generar el CSV",
        severity: "error",
      });
      setOpenAlert(true);
    }
  });


  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        // p: (theme) => theme.spacing(0, 1, 0, 3),
        // ...(numSelected > 0 && {
        //   color: 'primary.main',
        //   bgcolor: 'primary.lighter',
        // }),
      }}
    >
      
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar No. de Formato..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />     
      
        <Tooltip title="Descargar CSV">
          <IconButton onClick={handleDownload2}>
            <Iconify icon="solar:download-square-bold" />
          </IconButton>
        </Tooltip>    
        <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} pos="up" /> 
             
    </Toolbar>
  );
}
