import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import WifiIcon from '@mui/icons-material/Wifi';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VpnLockIcon from '@mui/icons-material/VpnLock';

import { DashboardContent } from 'src/layouts/dashboard';
//import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import data from './project-vpn.json'; // Importa el JSON de vpn, se tendria que modificar
import data4 from './project-rfc.json'; // Importa el JSON de rfc
import data5 from './project-pie.json'; // Importa el JSON para pie
import data6 from './project-bar.json'; // Importa el JSON para bar
import data2 from './project-internet.json'; // Importa el JSON de internet
import data3 from './project-telefonia.json'; // Importa el JSON de telefonia
import data7 from './project-bar-pasada.json'; // Importa el JSON para bar
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------
///VPN
const seqVPN = data.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
// Función para sumar los números de seqVPN
//const sumSeqVPN = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
//const seqVPN2 = sumSeqVPN(seqVPN); // Suma los valores de seqVPN
///INTERNET
const seqINTERNET = data2.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
//const sumSeqINTERNET = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
//const seqINTERNET2 = sumSeqINTERNET(seqINTERNET); // Suma los valores de seqINTERNET
///TELEFONIA
const seqTELEFONIA = data3.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
//const sumSeqTELEFONIA = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
//const seqTELEFONIA2 = sumSeqTELEFONIA(seqTELEFONIA); // Suma los valores de seqTELEFONIA
///RFC
const seqRFC = data4.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
//const sumSeqRFC = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
//const seqRFC2 = sumSeqRFC(seqRFC); // Suma los valores de seqRFC

const seqPIE = data5.map((item) => Number(item.value)); // Convierte cada valor de "SEQ" a número
const seqBARINTERNET = data6.map((item) => Number(item.Cuenta.Internet)); // Convierte cada valor de "SEQ" a número
const seqBARRFC = data6.map((item) => Number(item.Cuenta.RFC)); // Convierte cada valor de "SEQ" a número
const seqBARVPN = data6.map((item) => Number(item.Cuenta.VPN)); // Convierte cada valor de "SEQ" a número
const seqBARTELEFONIA = data6.map((item) => Number(item.Cuenta.Telefono)); // Convierte cada valor de "SEQ" a número
const fecha = data6.map((item) => String(item.Fecha)); // Convierte cada valor de "fecha" a string
///CONSTANTES PARA SEMANA PASADA
const seqBARINTERNETPASADA = data7.map((item) => Number(item.Cuenta.Internet)); // Convierte cada valor de "SEQ" a número
const seqBARRFCPASADA = data7.map((item) => Number(item.Cuenta.RFC)); // Convierte cada valor de "SEQ" a número
const seqBARVPNPASADA = data7.map((item) => Number(item.Cuenta.VPN)); // Convierte cada valor de "SEQ" a número
const seqBARTELEFONIAPASADA = data7.map((item) => Number(item.Cuenta.Telefono)); // Convierte cada valor de "SEQ" a número
const fechaPASADA = data7.map((item) => String(item.Fecha)); // Convierte cada valor de "fecha" a string

export function OverviewAnalyticsView() {

  const [formCountsData, setFormCountsData] = useState({ series: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormCounts = async () => {
      try {
        const response = await axios.get("/api2/v1/analytics/form-counts");
        if (response.status === 200) {
          setFormCountsData(response.data as any);
        } else {
          setError(`Error al obtener los datos: Código ${response.status}`);
        }
      } catch (apiError) {
        setError(`Error al conectar con la API: ${apiError instanceof Error ? apiError.message : 'Error desconocido'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFormCounts();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    console.log(fecha),
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hola, Bienvenido 👋 
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="VPN"
            percent={-200}
            total={seqPIE[0]}
            icon={<VpnLockIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: seqVPN,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="RFC"
            percent={600}
            total={seqPIE[2]}
            color="secondary"
            icon={<ShuffleIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series:seqRFC,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="INTERNET"
            percent={-600}
            total={seqPIE[1]}
            color="warning"
            icon={<WifiIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: seqINTERNET,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="TELEFONÍA"
            percent={-800}
            total={seqPIE[3]}
            color="error"
            icon={<PhoneIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: seqTELEFONIA,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Llenado de formatos totales"
            chart={{
              series: [
                { label: 'VPN', value: seqPIE[0] },
                { label: 'Ampliación de Internet', value: seqPIE[1] },
                { label: 'RFC', value: seqPIE[2] },
                { label: 'Teléfonia', value: seqPIE[3] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Formatos llenados esta semana"
            subheader= {"Semana del : "+fecha[0] + " al "+fecha[5]} 
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
              series: [
                { name: 'VPN', data: seqBARVPN },
                { name: 'RFC', data: seqBARRFC},
                { name: 'INTERNET', data: seqBARINTERNET },
                { name: "TELEFONÍA", data: seqBARTELEFONIA },
              ],
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Formatos llenados la semana anterior"
            subheader= {"Semana del : "+fechaPASADA[0] + " al "+fechaPASADA[5]} 
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
              series: [
                { name: 'VPN', data: seqBARVPNPASADA },
                { name: 'RFC', data: seqBARRFCPASADA},
                { name: 'INTERNET', data: seqBARINTERNETPASADA },
                { name: "TELEFONÍA", data: seqBARTELEFONIAPASADA },
              ],
            }}
          />
        </Grid>

      </Grid>
    </DashboardContent>
  );
}
