import {
  FONT_SIZE_DEFAULT,
  resolveFontSizePx,
  resolveThemeMode,
} from '@/components/settings/settings-utils';
import useSettings from '@/hooks/use-settings';
import { hexToRgba } from '@/utils/hex-to-rgba';
import { useEffect, useState, type ReactNode } from 'react';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

/**
 * Syncs theme settings to DOM for shadcn/Tailwind:
 * - Color presets -> --primary, --primary-foreground
 * - Theme mode -> dark class on <html> (supports light/dark/system)
 * - Direction -> dir on <html>
 */
const CONTRAST_CLASS_NAMES = ['contrast-soft', 'contrast-default', 'contrast-bold'] as const;

export default function ThemeVariablesProvider({ children }: Props) {
  const { setColor, themeMode, themeDirection, themeFontSize, themeContrast } = useSettings();
  const [prefersDark, setPrefersDark] = useState<boolean>(() => {
    if (typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDark(event.matches);
    };

    media.addEventListener('change', handleChange);
    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, []);

  const effectiveMode = resolveThemeMode(themeMode, prefersDark);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', setColor.main);
    root.style.setProperty('--primary-soft', setColor.lighter);
    root.style.setProperty('--primary-strong', setColor.dark);
    root.style.setProperty('--primary-foreground', setColor.contrastText ?? '#fff');
    root.style.setProperty('--accent', setColor.lighter);
    root.style.setProperty('--accent-foreground', setColor.dark);
    root.style.setProperty('--ring', hexToRgba(setColor.main, 0.35));
    root.style.setProperty('--chart-1', setColor.main);
    root.style.setProperty('--chart-2', setColor.dark);
    root.style.setProperty('--chart-3', setColor.light);
    root.style.setProperty('--chart-4', setColor.darker);
    root.style.setProperty('--chart-5', setColor.lighter);
    root.style.setProperty('--sidebar-primary', setColor.main);
    root.style.setProperty('--sidebar-ring', hexToRgba(setColor.main, 0.28));
  }, [setColor]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', effectiveMode === 'dark');
  }, [effectiveMode]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', themeDirection);
  }, [themeDirection]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--app-font-size',
      `${resolveFontSizePx(themeFontSize ?? FONT_SIZE_DEFAULT)}px`
    );
  }, [themeFontSize]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...CONTRAST_CLASS_NAMES);
    root.classList.add(`contrast-${themeContrast}`);
  }, [themeContrast]);

  return <>{children}</>;
}
