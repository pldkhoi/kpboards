//
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  notDefault: boolean;
  onToggle: VoidFunction;
};

export default function ToggleButton({ notDefault, open, onToggle }: Props) {
  const { t } = useTranslation();

  return (
    <span className="fixed right-5 top-1/2 z-[1200] -mt-8 rounded-full border border-white/55 bg-card/85 p-2.5 shadow-[0_24px_60px_-34px_rgba(13,28,22,0.45)] backdrop-blur-md">
      {notDefault && !open && (
        <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-destructive ring-4 ring-background" />
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onToggle}
            aria-label={t('settings.drawer.open')}
          >
            <Iconify icon="eva:options-2-fill" width={20} height={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">{t('settings.drawer.title')}</TooltipContent>
      </Tooltip>
    </span>
  );
}
