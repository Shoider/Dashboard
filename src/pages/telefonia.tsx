import { CONFIG } from 'src/config-global';

import { TelefoniaView } from 'src/sections/telefonia/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`RFC `}</title>

      <TelefoniaView />
    </>
  );
}
