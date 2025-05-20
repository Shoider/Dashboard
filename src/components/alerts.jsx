import { Alert, Snackbar } from "@mui/material";

export default function Alerts({ open, setOpen, alert, pos }) {
  const handleClose = () => {
    setOpen(false);
  };
  const vertical = pos || "bottom"; // Simplificación de la asignación condicional

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal: "center" }} // Uso de propiedad abreviada
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        variant="filled"
        sx={{
          padding: "16px 24px", // Aumenta el padding
          fontSize: "1rem", // Aumenta el tamaño de la fuente
          minWidth: "100px", // Establece un ancho mínimo
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
