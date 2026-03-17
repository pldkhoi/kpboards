import { Iconify } from '@/components';
import { isSettingsEqual } from '@/components/settings/settings-utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { defaultSettings } from '@/config';
import useSettings from '@/hooks/use-settings';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingColorPresets from './setting-color-presets';
import SettingContrast from './setting-contrast';
import SettingDirection from './setting-direction';
import SettingFontSize from './setting-font-size';
import SettingFullscreen from './setting-fullscreen';
import SettingLayout from './setting-layout';
import SettingMode from './setting-mode';
import SettingStretch from './setting-stretch';
import ToggleButton from './toggle-button';

// ----------------------------------------------------------------------

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section
      className="flex flex-col gap-3 rounded-[calc(var(--radius)*1.05)] border border-border/65 bg-background/55 p-4"
      aria-label={title}
    >
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function SettingsDrawer() {
  const { t } = useTranslation();
  const { onResetSetting, ...settings } = useSettings();

  const [open, setOpen] = useState(false);
  const notDefault = !isSettingsEqual(settings, defaultSettings);

  return (
    <>
      {!open && <ToggleButton open={open} notDefault={notDefault} onToggle={() => setOpen(true)} />}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex h-dvh w-[360px] flex-col overflow-hidden border-l border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,242,0.96))] p-0 backdrop-blur-xl sm:max-w-[360px] dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(12,20,30,0.96),rgba(9,17,26,0.98))]"
          showCloseButton={false}
        >
          <SheetHeader className="sticky top-0 z-10 flex flex-row items-center justify-between space-y-0 border-b border-border/60 bg-transparent px-6 py-5">
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary">
                Personalize
              </span>
              <SheetTitle className="text-lg font-semibold tracking-tight">
                {t('settings.drawer.title')}
              </SheetTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={onResetSetting}
                aria-label={t('settings.drawer.reset')}
              >
                <Iconify icon="ic:round-refresh" width={20} height={20} />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setOpen(false)}
                aria-label={t('settings.drawer.close')}
              >
                <Iconify icon="eva:close-fill" width={20} height={20} />
              </Button>
            </div>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-3">
            <div className="flex flex-col gap-4">
              <Section title={t('settings.sections.mode')}>
                <SettingMode />
              </Section>

              <Section title={t('settings.sections.fontSize')}>
                <SettingFontSize />
              </Section>

              <Section title={t('settings.sections.contrast')}>
                <SettingContrast />
              </Section>

              <Section title={t('settings.sections.direction')}>
                <SettingDirection />
              </Section>

              <Section title={t('settings.sections.layout')}>
                <SettingLayout />
              </Section>

              <Section title={t('settings.sections.presets')}>
                <SettingColorPresets />
              </Section>

              <Section title={t('settings.sections.stretch')}>
                <SettingStretch />
              </Section>

              <section className="rounded-[calc(var(--radius)*1.05)] border border-border/65 bg-background/55 p-4">
                <SettingFullscreen />
              </section>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
