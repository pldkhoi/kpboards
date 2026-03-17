import { Outlet } from 'react-router';

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,143,123,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(18,53,72,0.22),transparent_30%)]" />
      <div className="relative">
        <Outlet />
      </div>
    </main>
  );
}
