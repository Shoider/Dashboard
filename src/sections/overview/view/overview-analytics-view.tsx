import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import WifiIcon from '@mui/icons-material/Wifi';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VpnLockIcon from '@mui/icons-material/VpnLock';

//import { _description, _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytic-new';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';


// ----------------------------------------------------------------------
export function OverviewAnalyticsView() {

  // Llama a la API al cargar el componente
  const [allValues, setAllValues] = useState<number[]>([]); // Estado para almacenar los valores de "value"
  const [ registroErr, setregistroErr]=useState<string[]>([]); //Estado para almacenar los registros de "errores"
  const [ registroErrDes, setregistroErrDes]=useState<string[]>([]); //Estado para almacenar los registros de "errores"
  const [ registroErrFecha, setregistroErrFecha]=useState<string[]>([]); //Estado para almacenar los registros de "errores"
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
  const [RFCCount, setRFCCount] = useState<number[]>([]); 
  const [VPNCount, setVPNCount] = useState<number[]>([]); 
  const [InternetCount, setInternetCount] = useState<number[]>([]); 
  const [TelefonoCount, setTelefonoCount] = useState<number[]>([]);
  
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

  //Registro de errores
  useEffect(() => {
    axios.get<{ Bases: string; Mensaje: string , Fecha:string}[]>('/api2/v1/registroErrores')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setregistroErr(jsonData.map(item => item.Bases));
        setregistroErrDes(jsonData.map(item => item.Mensaje));  
        setregistroErrFecha(jsonData.map(item => item.Fecha));  
              //console.log('Errores:', jsonData);      
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);
  ///REGISTROS DE  ESTA SEMANA
  useEffect(() => {
    axios.get<{ Cuenta: { Internet: number; RFC: number; Telefono: number; VPN: number }; Fecha: string }[]>('/api2/v1/weekly-registrations')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setFecha(jsonData.map(item => item.Fecha));
        setVPN(jsonData.map(item => item.Cuenta.VPN));
        setInternet(jsonData.map(item => item.Cuenta.Internet));
        setTelefono(jsonData.map(item => item.Cuenta.Telefono));
        setRFC(jsonData.map(item => item.Cuenta.RFC));
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);
  ///REGISTROS DE SEMANA PASADA
  useEffect(() => {
    axios.get<{ Cuenta: { Internet: number; RFC: number; Telefono: number; VPN: number }; Fecha: string }[]>('/api2/v1/old-weekly-registrations')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setFecha2(jsonData.map(item => item.Fecha));
        setVPN2(jsonData.map(item => item.Cuenta.VPN));
        setInternet2(jsonData.map(item => item.Cuenta.Internet));
        setTelefono2(jsonData.map(item => item.Cuenta.Telefono));
        setRFC2(jsonData.map(item => item.Cuenta.RFC));
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);
  ///REGISTROS DE SEMANA , PORCENTAJE y CONTEO
  useEffect(() => {
    axios.get<{ internet: { count: number; percent: number; week: string }[];
    rfc: { count: number; percent: number; week: string }[];
    telefonia: { count: number; percent: number; week: string }[];
    vpn: { count: number; percent: number; week: string }[] }>('/api2/v1/weekly-stats')
      .then(response => {
        const jsonData = response.data; // Ahora TypeScript sabe que es del tipo correcto
        setVPNPercent(jsonData.vpn.map(item => item.percent));
        setVPNWeek(jsonData.vpn.map(item => item.week));
        setInternetPercent(jsonData.internet.map(item => item.percent));
        setInternetWeek(jsonData.internet.map(item => item.week));
        setTelefonoPercent(jsonData.telefonia.map(item => item.percent));
        setTelefonoWeek(jsonData.telefonia.map(item => item.week));
        setRFCPercent(jsonData.rfc.map(item => item.percent));
        setRFCWeek(jsonData.rfc.map(item => item.week));
        setRFCCount(jsonData.rfc.map(item => item.count));
        setVPNCount(jsonData.vpn.map(item => item.count));
        setInternetCount(jsonData.internet.map(item => item.count));
        setTelefonoCount(jsonData.telefonia.map(item => item.count));
      })
      .catch(apiError => {
        console.error('Error al llamar a la API:', apiError);
      });
  }, []);
  return (
    <DashboardContent maxWidth="xl">
      {/* <Box
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
            > */}
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hola, Bienvenido 
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="VPN"
            percent={VPNPercent[5]}
            total={allValues[0]}
            icon={<VpnLockIcon fontSize="large" />}
            chart={{
              categories: VPNWeek,
              series: VPNCount,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="RFC"
            percent={RFCPercent[5]}
            total={allValues[2]}
            color="secondary"
            icon={<ShuffleIcon fontSize="large" />}
            chart={{
              categories: RFCWeek,
              series:RFCCount,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="INTERNET"
            percent={InternetPercent[5]}
            total={allValues[1]}
            color="warning"
            icon={<WifiIcon fontSize="large" />}
            chart={{
              categories: InternetWeek,
              series: InternetCount,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="TELEFONÍA"
            percent={TelefonoPercent[5]}
            total={allValues[3]}
            color="error"
            icon={<PhoneIcon fontSize="large" />}
            chart={{
              categories: TelefonoWeek,
              series: TelefonoCount,
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
        <Grid 
        size={{ xs: 12, md: 6, lg: 8 }}>
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

        <Grid 
        size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews title="Registro de errores" 
            list={{
              des:registroErr.slice(0, 5).map((title2, idx) => ({
              title2,
              description: registroErrDes[idx] ?? "",
              fecha: registroErrFecha[idx] ?? "",
            })),        
          }}/>
        </Grid>

      </Grid>
      
      {/* </Box> */}
    </DashboardContent>
  );
}
