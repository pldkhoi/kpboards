import {
  applySettingsUpdate,
  clampFontSize,
  normalizeSettings,
  parseFontSizeInput,
  resolveThemeMode,
  toggleContrast,
  toggleDirection,
  toggleLayout,
  toggleThemeMode,
} from '@/components/settings/settings-utils';
import {
  type SettingsContextProps,
  type SettingsState,
  type SettingsUpdaterInput,
  type ThemeColorPresets,
  type ThemeContrast,
  type ThemeDirection,
  type ThemeLayout,
  type ThemeMode,
} from '@/components/settings/type';
import { defaultSettings } from '@/config';
import useLocalStorage from '@/hooks/use-local-storage';
import i18n from '@/locales/i18n';
import getColorPresets, { colorPresets, defaultPreset } from '@/utils/get-color-presets';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';

// ----------------------------------------------------------------------

const noop = () => undefined;
const noopUpdateSettings: SettingsContextProps['updateSettings'] = () => undefined;
const noopChangeMode = (_event: ChangeEvent<HTMLInputElement>) => undefined;
const noopChangeDirectionByLang = (_lang: string) => undefined;
const noopSetFontSize = (_value: number) => undefined;

const initialState: SettingsContextProps = {
  ...defaultSettings,
  effectiveThemeMode: defaultSettings.themeMode,
  updateSettings: noopUpdateSettings,
  // Mode
  onToggleMode: noop,
  onChangeMode: noopChangeMode,

  // Direction
  onToggleDirection: noop,
  onChangeDirection: noopChangeMode,
  onChangeDirectionByLang: noopChangeDirectionByLang,

  // Layout
  onToggleLayout: noop,
  onChangeLayout: noopChangeMode,

  // Contrast
  onToggleContrast: noop,
  onChangeContrast: noopChangeMode,

  // Color
  onChangeColor: noopChangeMode,

  // Font size
  onChangeFontSize: noopChangeMode,
  onSetFontSize: noopSetFontSize,

  setColor: defaultPreset,
  colorOption: [],

  // Stretch
  onToggleStretch: noop,

  // Reset
  onResetSetting: noop,
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage<SettingsState>('settings', defaultSettings);
  const [language, setLanguage] = useState(i18n.language);
  const [prefersDark, setPrefersDark] = useState<boolean>(() => {
    if (typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const normalizedSettings = useMemo(
    () => normalizeSettings(settings, defaultSettings),
    [settings]
  );

  const updateSettings = useCallback(
    (updater: SettingsUpdaterInput) => {
      setSettings((prev) => {
        const safePrev = normalizeSettings(prev, defaultSettings);
        return applySettingsUpdate(safePrev, updater, defaultSettings);
      });
    },
    [setSettings]
  );

  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      updateSettings({ themeDirection: lang === 'ar' ? 'rtl' : 'ltr' });
    },
    [updateSettings]
  );

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    onChangeDirectionByLang(language);
  }, [language, onChangeDirectionByLang]);

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

  // Mode

  const onToggleMode = useCallback(() => {
    updateSettings((prev) => ({ ...prev, themeMode: toggleThemeMode(prev.themeMode) }));
  }, [updateSettings]);

  const onChangeMode = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings({ themeMode: event.target.value as ThemeMode });
    },
    [updateSettings]
  );

  // Direction

  const onToggleDirection = useCallback(() => {
    updateSettings((prev) => ({ ...prev, themeDirection: toggleDirection(prev.themeDirection) }));
  }, [updateSettings]);

  const onChangeDirection = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings({ themeDirection: event.target.value as ThemeDirection });
    },
    [updateSettings]
  );

  // Layout

  const onToggleLayout = useCallback(() => {
    updateSettings((prev) => ({ ...prev, themeLayout: toggleLayout(prev.themeLayout) }));
  }, [updateSettings]);

  const onChangeLayout = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings({ themeLayout: event.target.value as ThemeLayout });
    },
    [updateSettings]
  );

  // Contrast

  const onToggleContrast = useCallback(() => {
    updateSettings((prev) => ({ ...prev, themeContrast: toggleContrast(prev.themeContrast) }));
  }, [updateSettings]);

  const onChangeContrast = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings({ themeContrast: event.target.value as ThemeContrast });
    },
    [updateSettings]
  );

  // Color

  const onChangeColor = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings({ themeColorPresets: event.target.value as ThemeColorPresets });
    },
    [updateSettings]
  );

  // Font size

  const onChangeFontSize = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings({ themeFontSize: parseFontSizeInput(event.target.value) });
    },
    [updateSettings]
  );

  const onSetFontSize = useCallback(
    (value: number) => {
      updateSettings({ themeFontSize: clampFontSize(value) });
    },
    [updateSettings]
  );

  // Stretch

  const onToggleStretch = useCallback(() => {
    updateSettings((prev) => ({ ...prev, themeStretch: !prev.themeStretch }));
  }, [updateSettings]);

  // Reset

  const onResetSetting = useCallback(() => {
    setSettings(defaultSettings);
  }, [setSettings]);

  const valueMemo = useMemo(
    () => ({
      ...normalizedSettings,
      effectiveThemeMode: resolveThemeMode(normalizedSettings.themeMode, prefersDark),
      updateSettings,

      // Mode
      onToggleMode,
      onChangeMode,

      // Direction
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,

      // Layout
      onToggleLayout,
      onChangeLayout,

      // Contrast
      onChangeContrast,
      onToggleContrast,

      // Stretch
      onToggleStretch,

      // Color
      onChangeColor,

      // Font size
      onChangeFontSize,
      onSetFontSize,

      setColor: getColorPresets(normalizedSettings.themeColorPresets),
      colorOption: colorPresets.map((color) => ({
        name: color.name,
        value: color.main,
      })),

      // Reset
      onResetSetting,
    }),
    [
      normalizedSettings,
      prefersDark,
      updateSettings,
      onToggleMode,
      onChangeMode,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      onToggleLayout,
      onChangeLayout,
      onChangeContrast,
      onToggleContrast,
      onToggleStretch,
      onChangeColor,
      onChangeFontSize,
      onSetFontSize,
      onResetSetting,
    ]
  );

  return <SettingsContext.Provider value={valueMemo}>{children}</SettingsContext.Provider>;
}

export { SettingsContext, SettingsProvider };
