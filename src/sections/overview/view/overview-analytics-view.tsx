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
import data2 from './project-internet.json';
import data3 from './project-telefonia.json'; 
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

export function OverviewAnalyticsView() {

  // Llama a la API al cargar el componente
  const [allValues, setAllValues] = useState<number[]>([]); // Estado para almacenar los valores de "value"
  const [fecha, setFecha] = useState<string[]>([]); // Estado para almacenar los valores de "fecha"
  const [VPN, setVPN] = useState<number[]>([]); // Estado para almacenar los valores de "vpn"
  const [Internet, setInternet] = useState<number[]>([]); 
  const [Telefono, setTelefono] = useState<number[]>([]); 
  const [RFC, setRFC] = useState<number[]>([]); 
  const [fecha2, setFecha2] = useState<string[]>([]); //Fecha SEMANA PASADA
  const [VPN2, setVPN2] = useState<number[]>([]); 
  const [Internet2, setInternet2] = useState<number[]>([]); 
  const [Telefono2, setTelefono2] = useState<number[]>([]);
  const [RFC2, setRFC2] = useState<number[]>([]); 
  const [VPNPercent, setVPNPercent] = useState<number[]>([]); 
  const [InternetPercent, setInternetPercent] = useState<number[]>([]);
  const [TelefonoPercent, setTelefonoPercent] = useState<number[]>([]);
  const [RFCPercent, setRFCPercent] = useState<number[]>([]);
  const [VPNWeek, setVPNWeek] = useState<string[]>([]);
  const [InternetWeek, setInternetWeek] = useState<string[]>([]);
  const [TelefonoWeek, setTelefonoWeek] = useState<string[]>([]);
  const [RFCWeek, setRFCWeek] = useState<string[]>([]);

  ///REGISTROS TOTALES
  useEffect(()=> {
  axios.get('/api2/v1/form-counts')
  .then(response => {
    const jsonData : {label: string ; value: number}[] = response.data; // Obtenemos el JSON de la respuesta
    setAllValues(jsonData.map((item) => item.value)); // Accede a los valores de "value"
  })
  .catch(apiError => {
    console.error('Error al llamar a la API:', apiError);
  });
},[]); // El segundo argumento vacío asegura que el efecto se ejecute solo una vez al montar el componente

///REGISTROS DE  ESTA SEMANA
useEffect(()=> {
  axios.get('/api2/v1/weekly-registrations')
  .then(response => {
    const jsonData :{ Cuenta:{ Internet: number; RFC: number; Telefono: number; VPN: number}; Fecha: string}[] = response.data; // Obtenemos el JSON de la respuesta
    setFecha(jsonData.map((item) => item.Fecha)); // Accede a los valores de "fecha"
    setVPN(jsonData.map((item) => item.Cuenta.VPN)); // Accede a los valores de "vpn"
    setInternet(jsonData.map((item) => item.Cuenta.Internet)); // Accede a los valores de "vpn"
    setTelefono(jsonData.map((item) => item.Cuenta.Telefono)); 
    setRFC(jsonData.map((item) => item.Cuenta.RFC)); 
  })
  .catch(apiError => {
    console.error('Error al llamar a la API:', apiError);
  });
},[]);
///REGISTROS DE SEMANA PASADA
useEffect(()=> {
  axios.get('/api2/v1/old-weekly-registrations')//old-weekly-registrations
  .then(response => {
    const jsonData :{ Cuenta:{ Internet: number; RFC: number; Telefono: number; VPN: number}; Fecha: string}[] = response.data; // Obtenemos el JSON de la respuesta
    setFecha2(jsonData.map((item) => item.Fecha)); // Accede a los valores de "fecha"
    setVPN2(jsonData.map((item) => item.Cuenta.VPN)); // Accede a los valores de "vpn"
    setInternet2(jsonData.map((item) => item.Cuenta.Internet)); 
    setTelefono2(jsonData.map((item) => item.Cuenta.Telefono)); 
    setRFC2(jsonData.map((item) => item.Cuenta.RFC));  
  })
  .catch(apiError => {
    console.error('Error al llamar a la API:', apiError);
  });
},[]);
///REGISTROS DE SEMANA Y PORCENTAJE
useEffect(()=> {
  axios.get('/api2/v1/weekly-stats')
  .then(response => {
    const jsonData :{internet:{count: number; percent : number; week:string};
    rfc:{count: number; percent : number; week:string};
    telefonía:{count: number; percent : number; week:string};
    vpn:{count: number; percent : number; week:string}}[] = response.data; 
    setVPNPercent(jsonData.map((item) => item.vpn.percent)); 
    setVPNWeek(jsonData.map((item) => item.vpn.week)); 
    setInternetPercent(jsonData.map((item) => item.internet.percent));
    setInternetWeek(jsonData.map((item) => item.internet.week));
    setTelefonoPercent(jsonData.map((item) => item.telefonía.percent));
    setTelefonoWeek(jsonData.map((item) => item.telefonía.week)); 
    setRFCPercent(jsonData.map((item) => item.rfc.percent));   
    setRFCWeek(jsonData.map((item) => item.rfc.week));
  })
  .catch(apiError => {
    console.error('Error al llamar a la API:', apiError);
  });
},[]);
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
            percent={VPNPercent[6]}
            total={allValues[0]}
            icon={<VpnLockIcon fontSize="large" />}
            chart={{
              categories: VPNWeek,
              series: seqVPN,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="RFC"
            percent={600}
            total={RFCPercent[6]}
            color="secondary"
            icon={<ShuffleIcon fontSize="large" />}
            chart={{
              categories: RFCWeek,
              series:seqRFC,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="INTERNET"
            percent={InternetPercent[6]}
            total={allValues[1]}
            color="warning"
            icon={<WifiIcon fontSize="large" />}
            chart={{
              categories: InternetWeek,
              series: seqINTERNET,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="TELEFONÍA"
            percent={TelefonoPercent[6]}
            total={allValues[3]}
            color="error"
            icon={<PhoneIcon fontSize="large" />}
            chart={{
              categories: TelefonoWeek,
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
                { name: 'VPN', data: VPN }, //TIPO 'Number'
                { name: 'RFC', data: RFC},
                { name: 'INTERNET', data: Internet },
                { name: "TELEFONÍA", data: Telefono },
              ],
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Formatos llenados la semana anterior"
            subheader= {"Semana del : "+fecha2[0] + " al "+fecha2[5]} 
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
              series: [
                { name: 'VPN', data: VPN2 },
                { name: 'RFC', data: RFC2},
                { name: 'INTERNET', data: Internet2 },
                { name: "TELEFONÍA", data: Telefono2 },
              ],
            }}
          />
        </Grid>

      </Grid>
    </DashboardContent>
  );
}
