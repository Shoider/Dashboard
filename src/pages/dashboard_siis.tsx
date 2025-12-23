
import { OverviewAnalyticsViewSIIS as DashboardSIISView } from 'src/sections/overview_copy/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Dashboard SIIS `}</title>
      <meta
        name="description"
        content="Mi Dashboard"
      />
      <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />

      <DashboardSIISView/>
    </>
  );
}