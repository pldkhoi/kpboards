import useSettings from '@/hooks/use-settings';
import { hexToRgba } from '@/utils/hex-to-rgba';
import { useTranslation } from 'react-i18next';
import SettingOptionCard from './setting-option-card';

// ----------------------------------------------------------------------

export default function SettingColorPresets() {
  const { t } = useTranslation();
  const { themeColorPresets, onChangeColor, colorOption } = useSettings();

  return (
    <div
      className="grid grid-cols-4 gap-2"
      dir="ltr"
      role="radiogroup"
      aria-label={t('settings.presets.label')}
    >
      {colorOption.map((color) => {
        const colorName = color.name;
        const colorValue = color.value;
        const isSelected = themeColorPresets === colorName;

        return (
          <SettingOptionCard
            key={colorName}
            name="themeColorPresets"
            value={colorName}
            checked={isSelected}
            onChange={onChangeColor}
            ariaLabel={t('settings.presets.option', { name: colorName })}
            className="flex h-11 items-center justify-center transition-colors"
            checkedClassName="border-2"
            uncheckedClassName="border-border text-muted-foreground hover:bg-muted/40"
            style={
              isSelected
                ? {
                    backgroundColor: hexToRgba(colorValue, 0.08),
                    borderColor: colorValue,
                    boxShadow: `inset 0 4px 8px 0 ${hexToRgba(colorValue, 0.24)}`,
                  }
                : undefined
            }
          >
            <div
              className="size-6 rounded-full transition-transform"
              style={{
                backgroundColor: colorValue,
                transform: isSelected ? 'none' : 'rotate(-45deg)',
              }}
            />
          </SettingOptionCard>
        );
      })}
    </div>
  );
}
