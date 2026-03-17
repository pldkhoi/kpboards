import Iconify from '@/components/iconify';
import useSettings from '@/hooks/use-settings';
import { useTranslation } from 'react-i18next';
import { type ThemeMode } from '../type';
import SettingOptionCard from './setting-option-card';

// ----------------------------------------------------------------------

export default function SettingMode() {
  const { t } = useTranslation();
  const { themeMode, onChangeMode } = useSettings();
  const modes: { value: ThemeMode; icon: string; label: string; className?: string }[] = [
    {
      value: 'light',
      icon: 'ph:sun-duotone',
      label: t('settings.mode.light'),
      className: 'bg-gradient-to-br from-white to-slate-100',
    },
    {
      value: 'dark',
      icon: 'ph:moon-duotone',
      label: t('settings.mode.dark'),
      className: 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100',
    },
    {
      value: 'system',
      icon: 'ph:desktop-duotone',
      label: t('settings.mode.system'),
      className: 'bg-gradient-to-br from-slate-100 to-slate-200',
    },
  ];

  return (
    <div
      className="grid grid-cols-3 gap-3"
      dir="ltr"
      role="radiogroup"
      aria-label={t('settings.mode.label')}
    >
      {modes.map(({ value, icon, label, className }) => {
        const isSelected = themeMode === value;

        return (
          <SettingOptionCard
            key={value}
            name="themeMode"
            value={value}
            checked={isSelected}
            onChange={onChangeMode}
            ariaLabel={`${t('settings.mode.label')} ${label}`}
            className={`flex h-[84px] flex-col items-center justify-center gap-1 text-muted-foreground ${className ?? ''}`}
            checkedClassName="border-primary text-primary shadow-lg ring-2 ring-primary/40"
            uncheckedClassName="hover:-translate-y-0.5 hover:shadow-md"
          >
            <Iconify icon={icon} width={28} height={28} />
            <span className="text-xs font-semibold">{label}</span>
          </SettingOptionCard>
        );
      })}
    </div>
  );
}
