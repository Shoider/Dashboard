import { CONFIG } from 'src/config-global';

import { InternetView } from 'src/sections/internet/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Internet `}</title>

      <InternetView />
    </>
  );
}
