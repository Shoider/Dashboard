import { CONFIG } from 'src/config-global';

import { RFCView } from 'src/sections/rfc/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`RFC `}</title>

      <RFCView />
    </>
  );
}
