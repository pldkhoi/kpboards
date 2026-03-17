import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';

// ----------------------------------------------------------------------

export interface AdminNavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  navItems: AdminNavItem[];
  logo?: React.ReactNode;
  isCollapsed: boolean;
  isDesktop: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const SIDEBAR_WIDTH = 256;
const SIDEBAR_COLLAPSED_WIDTH = 72;

// ----------------------------------------------------------------------

function NavLinks({
  navItems,
  isCollapsed,
  onNavigate,
}: {
  navItems: AdminNavItem[];
  isCollapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1.5 px-3 py-5">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          end={item.path === '/'}
          aria-label={item.title}
          className={({ isActive }) =>
            cn(
              'group relative flex items-center gap-3 rounded-[calc(var(--radius)*0.95)] px-3.5 py-3 text-sm font-medium transition-[transform,background-color,color,box-shadow]',
              isActive
                ? 'bg-white/12 text-white shadow-[0_20px_44px_-30px_rgba(0,0,0,0.6)]'
                : 'text-sidebar-foreground/68 hover:bg-white/6 hover:text-white',
              isCollapsed && 'justify-center px-2.5'
            )
          }
        >
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-current transition-colors group-hover:border-white/12 group-hover:bg-white/10 [&>svg]:size-5">
            {item.icon}
          </span>
          {!isCollapsed && <span className="truncate">{item.title}</span>}
        </NavLink>
      ))}
    </nav>
  );
}

// ----------------------------------------------------------------------

export default function AdminSidebar({
  navItems,
  logo,
  isCollapsed,
  isDesktop,
  mobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const sidebarContent = (
    <ScrollArea className="h-full">
      <div className="flex h-full flex-col">
        {logo && (
          <div className="flex shrink-0 items-center gap-3 border-b border-white/8 px-4 py-5">
            {logo}
          </div>
        )}
        <NavLinks
          navItems={navItems}
          isCollapsed={isCollapsed}
          onNavigate={isDesktop ? undefined : onMobileClose}
        />
      </div>
    </ScrollArea>
  );

  if (!isDesktop) {
    return (
      <Sheet open={mobileOpen} onOpenChange={(open) => !open && onMobileClose()}>
        <SheetContent
          side="left"
          className="w-80 border-r border-white/8 bg-sidebar p-0 text-sidebar-foreground"
          showCloseButton={false}
        >
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className="fixed left-0 top-0 z-30 h-full shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200"
      style={{ width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,143,123,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%)]" />
      <div className="relative h-full">{sidebarContent}</div>
    </aside>
  );
}

export { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH };
