import Iconify from '@/components/iconify';
import useSettings from '@/hooks/use-settings';
import { useTranslation } from 'react-i18next';
import { type ThemeContrast } from '../type';
import SettingOptionCard from './setting-option-card';

// ----------------------------------------------------------------------

export default function SettingContrast() {
  const { t } = useTranslation();
  const { themeContrast, onChangeContrast } = useSettings();
  const options: { value: ThemeContrast; icon: string; label: string }[] = [
    { value: 'soft', icon: 'mdi:circle-slice-3', label: t('settings.contrast.soft') },
    { value: 'default', icon: 'cil:contrast', label: t('settings.contrast.default') },
    { value: 'bold', icon: 'ion:contrast-outline', label: t('settings.contrast.bold') },
  ];

  return (
    <div
      className="grid grid-cols-3 gap-3"
      dir="ltr"
      role="radiogroup"
      aria-label={t('settings.contrast.label')}
    >
      {options.map(({ value, icon, label }) => {
        const isSelected = themeContrast === value;

        return (
          <SettingOptionCard
            key={value}
            name="themeContrast"
            value={value}
            checked={isSelected}
            onChange={onChangeContrast}
            ariaLabel={label}
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
