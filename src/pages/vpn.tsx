import { CONFIG } from 'src/config-global';

import { VPNView } from 'src/sections/vpn/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`VPN `}</title>

      <VPNView />
    </>
  );
}
