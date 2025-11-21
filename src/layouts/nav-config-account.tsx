import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

//Ocultarlas según el privilegio

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Inicio',
    href: '/dashboard',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
    key: "inicio"
  },
  {
    label: 'VPN',
    href: '/vpn',
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
    key:"vpn"
  },
  {
    label: 'Internet',
    href: '/internet',
    icon: <Iconify width={22} icon="solar:earth-bold-duotone" />,
    key:"internet"
  },
  {
    label: 'SdC',
    href: '/rfc',
    icon: <Iconify width={22} icon="solar:refresh-bold-dutone" />,
    key:"rfc"
  },
  {
    label: 'Telefonia',
    href: '/telefonia',
    icon: <Iconify width={22} icon="solar:call-dropped-bold-dutone" />,
    key:"telefonia"
  },
  {
    label: 'DNS',
    href: '/dns',
    icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    key:"dns"
  },
  // {
  //   label: 'Error',
  //   href: '/settings',
  //   icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  // },
];
