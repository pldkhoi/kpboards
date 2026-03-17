import { Button } from '@/components/ui/button';
import useSettings from '@/hooks/use-settings';
import { useTranslation } from 'react-i18next';
import {
  FONT_SIZE_DEFAULT,
  FONT_SIZE_MAX,
  FONT_SIZE_MIN,
  clampFontSize,
  parseFontSizeInput,
} from '../settings-utils';

// ----------------------------------------------------------------------

export default function SettingFontSize() {
  const { t } = useTranslation();
  const { themeFontSize, onSetFontSize } = useSettings();
  const value = clampFontSize(themeFontSize);

  return (
    <div className="space-y-4" dir="ltr">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{value}px base size</p>
          <p className="text-xs text-muted-foreground">
            Keep the interface comfortable across desktop and mobile.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => onSetFontSize(FONT_SIZE_DEFAULT)}>
          Reset
        </Button>
      </div>

      <input
        type="range"
        min={FONT_SIZE_MIN}
        max={FONT_SIZE_MAX}
        step={1}
        value={value}
        onChange={(event) => onSetFontSize(parseFontSizeInput(event.target.value, value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        aria-label={t('settings.fontSize.label')}
      />

      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-[calc(var(--radius)*0.9)] border border-border/70 bg-background/60 p-3">
        <label
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
          htmlFor="theme-font-size-input"
        >
          {t('settings.fontSize.input')}
        </label>
        <input
          id="theme-font-size-input"
          type="number"
          min={FONT_SIZE_MIN}
          max={FONT_SIZE_MAX}
          value={value}
          onChange={(event) => onSetFontSize(parseFontSizeInput(event.target.value, value))}
          className="h-11 w-24 rounded-[calc(var(--radius)*0.8)] border border-border/80 bg-input px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
          aria-label={t('settings.fontSize.input')}
        />
        <span className="text-xs text-muted-foreground">px</span>
      </div>

      <p className="text-xs text-muted-foreground">
        {t('settings.fontSize.helper', { min: FONT_SIZE_MIN, max: FONT_SIZE_MAX })}
      </p>
    </div>
  );
}
