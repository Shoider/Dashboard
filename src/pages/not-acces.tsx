//import { CONFIG } from 'src/config-global';

import { NotAccessView } from 'src/sections/denegado';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Page not access! | Error `}</title>

      <NotAccessView />
    </>
  );
}
