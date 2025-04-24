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
import data2 from './project-internet.json'; // Importa el JSON de internet
import data3 from './project-telefonia.json'; // Importa el JSON de telefonia
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------
///VPN
const seqVPN = data.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
// Función para sumar los números de seqVPN
const sumSeqVPN = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqVPN2 = sumSeqVPN(seqVPN); // Suma los valores de seqVPN
///INTERNET
const seqINTERNET = data2.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
const sumSeqINTERNET = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqINTERNET2 = sumSeqINTERNET(seqINTERNET); // Suma los valores de seqINTERNET
///TELEFONIA
const seqTELEFONIA = data3.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
const sumSeqTELEFONIA = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqTELEFONIA2 = sumSeqTELEFONIA(seqTELEFONIA); // Suma los valores de seqTELEFONIA
///RFC
const seqRFC = data4.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
const sumSeqRFC = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqRFC2 = sumSeqRFC(seqRFC); // Suma los valores de seqRFC

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
    //console.log(seqValue2),
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hola, Bienvenido 👋 
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="VPN"
            percent={-100}
            total={seqVPN2}
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
            percent={20}
            total={seqRFC2}
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
            percent={-300}
            total={seqINTERNET2}
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
            percent={-20}
            total={seqTELEFONIA2}
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
                { label: 'VPN', value: seqVPN2 },
                { label: 'Ampliación de Internet', value: seqINTERNET2 },
                { label: 'RFC', value: seqRFC2 },
                { label: 'Teléfonia', value: seqTELEFONIA2 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Formatos llenados esta semana"
            subheader="Semana del 21-25 de abril"
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
              series: [
                { name: 'VPN', data: seqVPN },
                { name: 'RFC', data: seqRFC},
                { name: 'INTERNET', data: seqINTERNET },
                { name: "TELEFONÍA", data: seqTELEFONIA },
              ],
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Formatos llenados la semana anterior"
            subheader="Semana del 14-18 de abril"
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
              series: [
                { name: 'VPN', data: [0,0,0,0,0,0] },
                { name: 'RFC', data: [0,0,0,0,0,0] },
                { name: 'INTERNET', data: [0,0,0,0,0,0]  },
                { name: "TELEFONÍA", data: [0,0,0,0,0,0]  },
              ],
            }}
          />
        </Grid>

      </Grid>
    </DashboardContent>
  );
}
