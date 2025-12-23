import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import WifiIcon from '@mui/icons-material/Wifi';
import Typography from '@mui/material/Typography';
import VpnLockIcon from '@mui/icons-material/VpnLock';

import { DashboardContent } from 'src/layouts/dashboard';

//import { AnalyticsNews } from '../analytic-new';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';


// ----------------------------------------------------------------------
export function OverviewAnalyticsViewSIIS() {

  // Llama a la API al cargar el componente
  const [allValues, setAllValues] = useState<number[]>([]); // Estado para almacenar los valores de "value"
  const [fecha, setFecha] = useState<string[]>([]); // Estado para almacenar los valores de "fecha"
  const [DNS, setDNS] = useState<number[]>([]); // Estado para almacenar los valores de "vpn"
  const [ABC, setABC] = useState<number[]>([]); 
 
  const [fecha2, setFecha2] = useState<string[]>([]); //Fecha SEMANA PASADA
  const [DNS2, setDNS2] = useState<number[]>([]); 
  const [ABC2, setABC2] = useState<number[]>([]); 
 
  const [DNSPercent, setDNSPercent] = useState<number[]>([]); 
  const [ABCPercent, setABCPercent] = useState<number[]>([]);
  
  const [DNSWeek, setDNSWeek] = useState<string[]>([]);
  const [ABCWeek, setABCWeek] = useState<string[]>([]);
  
  
  const [DNSCount, setDNSCount] = useState<number[]>([]); 
  const [ABCCount, setABCCount] = useState<number[]>([]); 
  
  
  ///REGISTROS TOTALES
  useEffect(() => {
    // Corrección para manejar el tipo de respuesta de axios
    axios.get<{ label: string; value: number }[]>('/api2/v1/form-counts')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setAllValues(jsonData.map(item => item.value));
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);

 
  ///REGISTROS DE  ESTA SEMANA
  useEffect(() => {
    axios.get<{ Cuenta: { DNS: number; ABC: number }; Fecha: string }[]>('/api2/v1/weekly-registrations')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setFecha(jsonData.map(item => item.Fecha));
        setDNS(jsonData.map(item => item.Cuenta.DNS));
        setABC(jsonData.map(item => item.Cuenta.ABC));
        
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);
  ///REGISTROS DE SEMANA PASADA
  useEffect(() => {
    axios.get<{ Cuenta: { ABC: number; DNS: number}; Fecha: string }[]>('/api2/v1/old-weekly-registrations')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setFecha2(jsonData.map(item => item.Fecha));
        setDNS2(jsonData.map(item => item.Cuenta.DNS));
        setABC2(jsonData.map(item => item.Cuenta.ABC));
        
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);
  ///REGISTROS DE SEMANA , PORCENTAJE y CONTEO
  useEffect(() => {
    axios.get<{ abc: { count: number; percent: number; week: string }[];
    //rfc: { count: number; percent: number; week: string }[];
    //telefonia: { count: number; percent: number; week: string }[];
    dns: { count: number; percent: number; week: string }[] }>('/api2/v1/weekly-stats')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setDNSPercent(jsonData.dns.map(item => item.percent));
        setDNSWeek(jsonData.dns.map(item => item.week));
        setABCPercent(jsonData.abc.map(item => item.percent));
        setABCWeek(jsonData.abc.map(item => item.week));
        
        setDNSCount(jsonData.dns.map(item => item.count));
        setABCCount(jsonData.abc.map(item => item.count));
       
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);
  return (
    <DashboardContent maxWidth="xl">
      
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hola, Bienvenido 
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="DNS"
            percent={DNSPercent[5]}
            total={allValues[4]}
            icon={<VpnLockIcon fontSize="large" />}
            chart={{
              categories: DNSWeek,
              series: DNSCount,
            }}
          />
        </Grid>       

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="ABC"
            percent={ABCPercent[5]}
            total={allValues[5]}
            color="warning"
            icon={<WifiIcon fontSize="large" />}
            chart={{
              categories: ABCWeek,
              series: ABCCount,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Llenado de formatos totales"
            chart={{
              series: [
                { label: 'DNS', value: allValues[4] },
                { label: 'ABC', value: allValues[5] },
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
                { name: 'DNS', data: DNS }, //TIPO 'Number'
                { name: 'ABC', data: ABC },
              ],
            }}
          />
        </Grid>
        <Grid 
        size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Formatos llenados la semana anterior"
            subheader= {"Semana del : "+fecha2[0] + " al "+fecha2[5]} 
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
              series: [
                { name: 'DNS', data: DNS2 },
                { name: 'ABC', data: ABC2 },
              ],
            }}
          />
        </Grid>
        
      </Grid>
      
    </DashboardContent>
  );
}
