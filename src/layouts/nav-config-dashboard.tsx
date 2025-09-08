import { SvgColor } from 'src/components/svg-color';


//Ocultarlas según el privilegio
// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  key:string;
};

export const navData :NavItem[] = [
  {
    title: 'VPN',
    path: '/vpn',
    icon: icon('ic-vpn'),
    key:"vpn",
  },
  {
    title: 'Internet',
    path: '/internet',
    icon: icon('ic-internet'),
    key:"internet"
  },
  {
    title: 'SdC',
    path: '/rfc',
    icon: icon('ic-change'),
    key:"rfc"
  },
  {
    title: 'Telefonia',
    path: '/telefonia',
    icon: icon('ic-phone'),
    key:"telefonia"
  },
  
];
//console.log(navData)
