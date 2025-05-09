import { Label } from 'src/components/label';
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
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },

  {
    title: 'VPN',
    path: '/vpn',
    icon: icon('ic-lock'),
  },
  
];
//console.log(navData)
