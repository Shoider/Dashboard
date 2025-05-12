import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Inicio',
    href: '/dashboard',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'VPN',
    href: '/vpn',
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Internet',
    href: '/internet',
    icon: <Iconify width={22} icon="solar:earth-bold-duotone" />,
  },
  {
    label: 'RFC',
    href: '/rfc',
    icon: <Iconify width={22} icon="solar:refresh-bold-dutone" />,
  },
  {
    label: 'Telefonia',
    href: '/telefonia',
    icon: <Iconify width={22} icon="solar:call-dropped-bold-dutone" />,
  },
  {
    label: 'Error',
    href: '/settings',
    icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  },
];
