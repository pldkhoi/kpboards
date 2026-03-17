import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { PATH_PAGE } from '@/routes/paths';
import createAvatar from '@/utils/create-avatar';
import { MenuIcon, PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

// ----------------------------------------------------------------------

const HEADER_HEIGHT = 56;

interface AdminHeaderProps {
  breadcrumb?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  userMenu?: React.ReactNode;
  userDisplayName?: string;
  isDesktop: boolean;
  isCollapsed: boolean;
  onMenuClick: () => void;
  onCollapseClick: () => void;
}

// ----------------------------------------------------------------------

export default function AdminHeader({
  breadcrumb,
  searchPlaceholder = 'Search...',
  onSearch,
  userMenu,
  userDisplayName,
  isDesktop,
  isCollapsed,
  onMenuClick,
  onCollapseClick,
}: AdminHeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const defaultUserMenu = (
    <>
      <DropdownMenuItem asChild>
        <Link to={PATH_PAGE.adminSettings}>Preferences</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          logout(user?.refreshToken ?? '');
          void navigate(PATH_PAGE.login, { replace: true });
        }}
      >
        Logout
      </DropdownMenuItem>
    </>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border/70 bg-background/70 px-4 backdrop-blur-xl sm:px-6'
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {!isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="shrink-0 text-foreground"
            aria-label="Open menu"
          >
            <MenuIcon className="size-5" />
          </Button>
        )}

        {isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapseClick}
            className="shrink-0 text-foreground"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftIcon className="size-5" />
            ) : (
              <PanelLeftCloseIcon className="size-5" />
            )}
          </Button>
        )}

        <div className="min-w-0 flex-1 space-y-1">
          <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary">
            Workspace
          </span>
          {breadcrumb && <div className="min-w-0 truncate [&>*]:truncate">{breadcrumb}</div>}
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center lg:flex">
        <div className="relative w-full max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden text-right lg:block">
          <p className="text-sm font-semibold text-foreground">
            {userDisplayName ?? user?.firstName ?? user?.username ?? 'Demo user'}
          </p>
          <p className="text-xs text-muted-foreground">Frontend mock workspace</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              aria-label="User menu"
            >
              <Avatar className="size-10">
                <AvatarFallback className="text-xs">
                  {createAvatar(userDisplayName ?? user?.firstName ?? user?.username ?? '?').name}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {userMenu ?? defaultUserMenu}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export { HEADER_HEIGHT };
