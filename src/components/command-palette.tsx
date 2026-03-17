import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { PATH_PAGE } from '@/routes/paths';
import { Command } from 'cmdk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export interface CommandAction {
  id: string;
  label: string;
  shortcut?: string;
  onSelect?: () => void;
  href?: string;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actions?: CommandAction[];
  className?: string;
}

// ----------------------------------------------------------------------

const defaultActions: CommandAction[] = [
  { id: 'home', label: 'Go to Home', href: PATH_PAGE.home },
  { id: 'portfolio', label: 'Go to Portfolio', href: PATH_PAGE.portfolio },
  { id: 'login', label: 'Go to Login', href: PATH_PAGE.login },
  { id: 'admin-dashboard', label: 'Go to Admin Dashboard', href: PATH_PAGE.adminDashboard },
];

// ----------------------------------------------------------------------

export default function CommandPalette({
  open,
  onOpenChange,
  actions = defaultActions,
  className,
}: CommandPaletteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0" aria-describedby={undefined}>
        <Command className={cn('rounded-lg border shadow-md', className)} loop>
          <div className="flex items-center border-b px-3">
            <span className="mr-2 text-muted-foreground">⌘</span>
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-1">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            {actions.map((action) => (
              <Command.Item
                key={action.id}
                value={action.label}
                onSelect={() => {
                  if (action.href) {
                    void navigate(action.href);
                    onOpenChange(false);
                  }
                  action.onSelect?.();
                }}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                {action.label}
                {action.shortcut && (
                  <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 text-xs">
                    {action.shortcut}
                  </kbd>
                )}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
