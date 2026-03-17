import Iconify from '@/components/iconify';
import useSettings from '@/hooks/use-settings';
import { useTranslation } from 'react-i18next';
import { type ThemeDirection } from '../type';
import SettingOptionCard from './setting-option-card';

// ----------------------------------------------------------------------

export default function SettingDirection() {
  const { t } = useTranslation();
  const { themeDirection, onChangeDirection } = useSettings();
  const directions: { value: ThemeDirection; icon: string; label: string }[] = [
    { value: 'ltr', icon: 'ph:align-left-duotone', label: t('settings.direction.ltr') },
    { value: 'rtl', icon: 'ph:align-right-duotone', label: t('settings.direction.rtl') },
  ];

  return (
    <div
      className="grid grid-cols-2 gap-5"
      dir="ltr"
      role="radiogroup"
      aria-label={t('settings.direction.label')}
    >
      {directions.map(({ value, icon, label }) => {
        const isSelected = themeDirection === value;

        return (
          <SettingOptionCard
            key={value}
            name="themeDirection"
            value={value}
            checked={isSelected}
            onChange={onChangeDirection}
            ariaLabel={`${t('settings.direction.label')} ${label}`}
            className="flex h-[84px] flex-col items-center justify-center gap-1 text-muted-foreground"
            checkedClassName="border-primary bg-primary/10 text-primary shadow-lg"
            uncheckedClassName="hover:bg-muted/40"
          >
            <Iconify icon={icon} width={28} height={28} />
            <span className="text-xs font-medium">{label}</span>
          </SettingOptionCard>
        );
      })}
    </div>
  );
}
