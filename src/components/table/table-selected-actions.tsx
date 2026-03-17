import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
//
import { MenuPopover } from '@/components';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
  actions?: React.ReactNode;
  numSelected: number;
  status: string;
  setSnackBar: (open: boolean, message: string) => void;
  handleAssignEventsSelected: (numSelected: number) => void;
  handleDeactivateUsersSelected: (numSelected: number) => void;
}

export default function TableSelectedActions({
  dense,
  actions,
  numSelected,
  status,
  setSnackBar,
  handleAssignEventsSelected,
  handleDeactivateUsersSelected,
  className,
  ...other
}: Props) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleClick = (message: string) => {
    setSnackBar(true, message);
  };

  const menuItemClass =
    'flex w-full cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground';

  return (
    <div
      className={cn(
        'flex h-14 items-center gap-4 rounded-lg bg-primary px-4',
        dense && 'pl-6',
        className
      )}
      {...other}
    >
      <p className={cn('text-sm text-white', dense && 'ml-6')}>{numSelected} items selected</p>
      <p className={cn('text-sm font-medium text-white', dense && 'ml-6')}>
        | Select all items on page
      </p>
      <Button variant="outline" className="bg-white" onClick={handleOpenMenu}>
        Actions
        <ChevronDown className="ml-1 size-4" />
      </Button>

      <MenuPopover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        className="w-40"
      >
        {status === 'active' && (
          <>
            <button
              type="button"
              className={menuItemClass}
              onClick={() => {
                handleAssignEventsSelected(numSelected);
                handleCloseMenu();
              }}
            >
              Assign Event
            </button>
            <button
              type="button"
              className={cn(menuItemClass, 'text-destructive')}
              onClick={() => {
                handleDeactivateUsersSelected(numSelected);
                handleCloseMenu();
              }}
            >
              Deactivate Users
            </button>
          </>
        )}
        {status === 'invited' && (
          <>
            <button
              type="button"
              className={menuItemClass}
              onClick={() => {
                handleClick(`${numSelected} invite has been re-sent`);
                handleCloseMenu();
              }}
            >
              Resend Invite
            </button>
            <button
              type="button"
              className={cn(menuItemClass, 'text-destructive')}
              onClick={handleCloseMenu}
            >
              Cancel Invite
            </button>
          </>
        )}
        {status === 'inactive' && (
          <button
            type="button"
            className={menuItemClass}
            onClick={() => {
              handleClick(`${numSelected} users has been reactivated`);
              handleCloseMenu();
            }}
          >
            Reactivate User
          </button>
        )}
      </MenuPopover>
      <div className="flex-1" />
      {actions && actions}
    </div>
  );
}
