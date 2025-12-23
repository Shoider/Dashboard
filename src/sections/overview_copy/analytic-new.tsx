import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {    des:{
    title2: string;    
    description: string;
    fecha:string;
  }[];  
  };
};

export function AnalyticsNews({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 405 }}>
        <Box 
        sx={{
          width: '100%',
          py: 2,
          px: 3,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }
       }     
  >
          {list.des.map((item, idx) => (
            <ListItemText
              key={idx}
              primary={item.title2}
              secondary={`${item.description} - ${item.fecha}`}         
              slotProps={{
                primary: { noWrap: true },
                secondary: {
                  noWrap: true,
                  sx: { mt: 0.5 },
                },
              }}
              sx={[
                (theme)=>({
                  borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
                  mb: 2,
                  width: '100%',
                }),
                
                
                 ]}
            />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}
