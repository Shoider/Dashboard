import Grid from '@mui/material/Grid';
import WifiIcon from '@mui/icons-material/Wifi';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VpnLockIcon from '@mui/icons-material/VpnLock';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import data from './project-vpn.json'; // Importa el JSON de vpn, se tendria que modificar
import data2 from './project-internet.json'; // Importa el JSON de internet
import data3 from './project-telefonia.json'; // Importa el JSON de telefonia
import data4 from './project-rfc.json'; // Importa el JSON de telefonia
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------
///VPN
const seqVPN = data.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
// Función para sumar los números de seqValue
const sumSeqVPN = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqVPN2 = sumSeqVPN(seqVPN); // Suma los valores de seqValue
///INTERNET
const seqINTERNET = data2.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
const sumSeqINTERNET = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqINTERNET2 = sumSeqINTERNET(seqINTERNET); // Suma los valores de seqValue
///TELEFONIA
const seqTELEFONIA = data3.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
const sumSeqTELEFONIA = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqTELEFONIA2 = sumSeqTELEFONIA(seqTELEFONIA); // Suma los valores de seqValue
///RFC
const seqRFC = data4.map((item) => Number(item.seq)); // Convierte cada valor de "SEQ" a número
const sumSeqRFC = (values: number[]) => values.reduce((acc, curr) => acc + curr, 0);
const seqRFC2 = sumSeqRFC(seqRFC); // Suma los valores de seqValue

export function OverviewAnalyticsView() {
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
            percent={2.6}
            total={714000}
            icon={<VpnLockIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="RFC"
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon={<ShuffleIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="INTERNET"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<WifiIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="TELEFONÍA"
            percent={3.6}
            total={234}
            color="error"
            icon={<PhoneIcon fontSize="large" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
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
            title="Formatos llenados por semana"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
              series: [
                { name: 'VPN', data: [10, 2, 7, 6, 2, 4, 1] },
                { name: 'RFC', data: [10, 2, 7, 6, 2, 4, 1] },
                { name: 'INTERNET', data: [10, 2, 7, 6, 2, 4, 1] },
                { name: "TELEFONÍA", data: seqVPN },
              ],
            }}
          />
        </Grid>

        {/** 
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2024', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>*/}

      {/**
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

       
       {/** <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Traffic by site" list={_traffic} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>*/} 
      </Grid>
    </DashboardContent>
  );
}
