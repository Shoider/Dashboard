import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData :NavItem[] = [
  {
    title: 'VPN',
    path: '/vpn',
    icon: icon('ic-vpn'),
  },
  {
    title: 'Internet',
    path: '/internet',
    icon: icon('ic-internet'),
  },
  {
    title: 'RFC',
    path: '/rfc',
    icon: icon('ic-change'),
  },
  {
    title: 'Telefonia',
    path: '/telefonia',
    icon: icon('ic-phone'),
  },
  
];
//console.log(navData)
