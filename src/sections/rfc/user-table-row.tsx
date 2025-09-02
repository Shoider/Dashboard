import axios from 'axios';
import { useState, useCallback } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
//import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import Alerts from 'src/components/alerts';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type UserProps = {
  _id: number;
  noticket: string;
  memo:string;
  descbreve:string;
  nombreJefe:string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const [alert, setAlert] = useState({
      message: "",
      severity: "",
    });
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Nueva función para manejar la descarga
  const handleDownload = useCallback(async () => {
    handleClosePopover(); // Cierra el popover al hacer clic en descargar
    //console.log("Clic en boton descargar PDF")
    try {

      setAlert({
        message: `Generando PDF`,
        severity: "success",
      });
      setOpenAlert(true);

      // Llama a la API para obtener el PDF
      const pdfResponse = await axios.post(
        "/api/v3/rfc",
        { id: row._id },
        {
          responseType: "blob",
        },
      );      

      if (pdfResponse.status === 200) {
        const blob = new Blob([pdfResponse.data as BlobPart], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        // Crear un enlace temporal y simular el clic para descargar
        const link = document.createElement("a");
        link.href = url;
        link.download = `RFC_${row._id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setAlert({
          message: "PDF descargado correctamente",
          severity: "success",
        });
        setOpenAlert(true);
      } else {
        console.error("Ocurrió un error al generar el PDF");
        console.error(pdfResponse.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        message: "Ocurrió un error al generar el PDF",
        severity: "error",
      });
      setOpenAlert(true);
    }
  }, [row._id, handleClosePopover]); // Asegúrate de incluir las dependencias necesarias
 
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}


        <TableCell>{row._id}</TableCell>

        <TableCell>{row.noticket}</TableCell>


        <TableCell>{row.memo}</TableCell>

        <TableCell>{row.descbreve}</TableCell>

        <TableCell>{row.nombreJefe}</TableCell>


       {/* <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell>*/}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleDownload} >
            <Iconify icon="solar:download-square-bold"/>
            Descargar PDF             
          </MenuItem>

          {/* <MenuItem onClick={handleDownload2}>
            <Iconify icon="solar:download-square-bold" />
              Descargar csv
          </MenuItem>  */}

        </MenuList>
      </Popover>

      {/* Mostrar alertas */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} pos="up" />
    </>
  );
}
