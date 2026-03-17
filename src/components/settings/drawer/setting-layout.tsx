import useSettings from '@/hooks/use-settings';
import { useTranslation } from 'react-i18next';
import { type ThemeLayout } from '../type';
import SettingOptionCard from './setting-option-card';

// ----------------------------------------------------------------------

type LayoutBoxProps = {
  isSelected: boolean;
};

function VerticalBox({ isSelected }: LayoutBoxProps) {
  return (
    <>
      <div
        className={`mb-1.5 h-3 w-full rounded opacity-90 ${
          isSelected ? 'bg-primary' : 'bg-muted-foreground'
        }`}
      />
      <div
        className={`h-8 w-full rounded border border-dashed ${
          isSelected ? 'border-primary bg-primary/20' : 'border-border bg-muted-foreground/10'
        }`}
      />
    </>
  );
}

function HorizontalBox({ isSelected }: LayoutBoxProps) {
  return (
    <>
      <div
        className={`mb-1.5 h-3 w-full rounded opacity-90 ${
          isSelected ? 'bg-primary' : 'bg-muted-foreground'
        }`}
      />
      <div className="flex w-full justify-between">
        <div
          className={`h-8 w-5 rounded opacity-30 ${isSelected ? 'bg-primary' : 'bg-muted-foreground'}`}
        />
        <div
          className={`h-8 flex-1 rounded border border-dashed ${isSelected ? 'border-primary bg-primary/20' : 'border-border bg-muted-foreground/10'}`}
          style={{ width: 'calc(100% - 26px)' }}
        />
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

export default function SettingLayout() {
  const { t } = useTranslation();
  const { themeLayout, onChangeLayout } = useSettings();
  const layouts: ThemeLayout[] = ['horizontal', 'vertical'];

  return (
    <div
      className="grid grid-cols-2 gap-5"
      dir="ltr"
      role="radiogroup"
      aria-label={t('settings.layout.label')}
    >
      {layouts.map((layout) => {
        const isSelected = themeLayout === layout;
        const isVertical = layout === 'vertical';

        return (
          <SettingOptionCard
            key={layout}
            name="themeLayout"
            value={layout}
            checked={isSelected}
            onChange={onChangeLayout}
            ariaLabel={`${t('settings.layout.label')} ${t(`settings.layout.${layout}`)}`}
            className="flex flex-col p-3 text-muted-foreground"
            checkedClassName="border-primary bg-primary/10 text-primary shadow-lg"
            uncheckedClassName="hover:bg-muted/30"
          >
            {isVertical ? (
              <VerticalBox isSelected={isSelected} />
            ) : (
              <HorizontalBox isSelected={isSelected} />
            )}
            <span className="mt-1 text-center text-xs font-medium">
              {t(`settings.layout.${layout}`)}
            </span>
          </SettingOptionCard>
        );
      })}
    </div>
  );
}
