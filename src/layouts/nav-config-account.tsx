import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

//Ocultarlas según el privilegio

// ----------------------------------------------------------------------

export const getAccountData = (): AccountPopoverProps['data'] => {
  const tipoUsuario = localStorage.getItem("tipoUsuario") || "";
  const inicioHref = (tipoUsuario === 'dns' || tipoUsuario === 'abc') ? '/dashboard_siis' : '/dashboard';

  return [
    {
      label: 'Inicio',
      href: inicioHref,
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
    {
      label: 'ABC',
      href: '/abc',
      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
      key:"abc"
    },
    // {
    //   label: 'Error',
    //   href: '/settings',
    //   icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    // },
  ];
};

export const _account = getAccountData();
