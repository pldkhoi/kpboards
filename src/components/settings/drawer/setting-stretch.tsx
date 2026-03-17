import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useSettings from '@/hooks/use-settings';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function SettingStretch() {
  const { t } = useTranslation();
  const { themeStretch, onToggleStretch } = useSettings();

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4">
      <Label htmlFor="stretch-toggle" className="cursor-pointer text-sm">
        {t('settings.stretch.label')}
      </Label>
      <Switch
        id="stretch-toggle"
        checked={themeStretch}
        onCheckedChange={onToggleStretch}
        aria-label={t('settings.stretch.toggle')}
      />
    </div>
  );
}
