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

import data from './project-vpn.json'; // Importa el JSON de vpn
import data4 from './project-rfc.json'; 
import data5 from './project-pie.json'; 
import data6 from './project-bar.json'; 
import data2 from './project-internet.json';
import data3 from './project-telefonia.json'; 
import data7 from './project-bar-pasada.json'; 
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------
///VPN SE OCUPA PARA VALORES TOTALES DE AÑO
const seqVPN = data.map((item) => Number(item.seq)); // Convierte cada valor de "seq" a número
///INTERNET SE OCUPA PARA VALORES TOTALES DE AÑO
const seqINTERNET = data2.map((item) => Number(item.seq)); 
///TELEFONIA SE OCUPA PARA VALORES TOTALES DE AÑO
const seqTELEFONIA = data3.map((item) => Number(item.seq)); 
///RFC
const seqRFC = data4.map((item) => Number(item.seq)); 
//CONSTANTES DE ESTA SEMANA
const seqPIE = data5.map((item) => Number(item.value)); 
const seqBARINTERNET = data6.map((item) => Number(item.Cuenta.Internet)); 
const seqBARRFC = data6.map((item) => Number(item.Cuenta.RFC)); 
const seqBARVPN = data6.map((item) => Number(item.Cuenta.VPN)); 
const seqBARTELEFONIA = data6.map((item) => Number(item.Cuenta.Telefono)); 
const fecha = data6.map((item) => String(item.Fecha)); // Convierte cada valor de "fecha" a string
///CONSTANTES PARA SEMANA PASADA
const seqBARINTERNETPASADA = data7.map((item) => Number(item.Cuenta.Internet)); 
const seqBARRFCPASADA = data7.map((item) => Number(item.Cuenta.RFC)); 
const seqBARVPNPASADA = data7.map((item) => Number(item.Cuenta.VPN)); 
const seqBARTELEFONIAPASADA = data7.map((item) => Number(item.Cuenta.Telefono)); 
const fechaPASADA = data7.map((item) => String(item.Fecha)); 

export function OverviewAnalyticsView() {

  // Llama a la API al cargar el componente
  let seqPIETest;
  const [allValues, setAllValues] = useState<number[]>([]); // Estado para almacenar los valores de "value"

  axios.get('/api2/v1/form-counts')
  .then(response => {
    const jsonData : {label: string ; value: number}[] = response.data; // Obtenemos el JSON de la respuesta
    setAllValues(jsonData.map((item) => item.value)); // Accede a los valores de "value"
    console.log('Valores de value:', allValues); // Muestra los valores en consola
    console.log('Valores de value REAL:', seqPIE);//COMPARAR QUE SALGA LO MISMO  
  })
  .catch(apiError => {
    console.error('Error al llamar a la API:', apiError);
  });

  return (
    console.log(fecha),
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hola, Bienvenido 👋 😩 🚫
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
                { label: 'VPN', value: allValues[0] },
                { label: 'Ampliación de Internet', value: allValues[1] },
                { label: 'RFC', value: allValues[2] },
                { label: 'Teléfonia', value: allValues[3] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Formatos llenados esta semana"
            subheader= {"Semana del : "+fecha[0] + " al "+fecha[5]} //TIPO 'String'
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
              series: [
                { name: 'VPN', data: seqBARVPN }, //TIPO 'Number'
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
