// ----------------------------------------------------------------------

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeDirection = 'rtl' | 'ltr';
export type ThemeContrast = 'soft' | 'default' | 'bold';
export type ThemeLayout = 'vertical' | 'horizontal';
export type ThemeColorPresets =
  | 'default'
  | 'indigo'
  | 'violet'
  | 'cyan'
  | 'sky'
  | 'emerald'
  | 'teal'
  | 'amber'
  | 'orange'
  | 'rose'
  | 'fuchsia'
  | 'slate';
export type ThemeFontSize = number;
export type ThemeStretch = boolean;

export interface SettingsState {
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: ThemeStretch;
  themeContrast: ThemeContrast;
  themeDirection: ThemeDirection;
  themeColorPresets: ThemeColorPresets;
  themeFontSize: ThemeFontSize;
}

export type SettingsValueProps = SettingsState;

export type SettingsUpdaterInput =
  | Partial<SettingsState>
  | ((prev: SettingsState) => SettingsState);
export type ThemeEffectiveMode = Exclude<ThemeMode, 'system'>;
export type SettingRadioChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type SettingRangeChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type SettingsContextProps = {
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeContrast: ThemeContrast;
  themeDirection: ThemeDirection;
  themeColorPresets: ThemeColorPresets;
  themeFontSize: ThemeFontSize;
  themeStretch: boolean;
  effectiveThemeMode: ThemeEffectiveMode;
  setColor: ColorVariants;
  colorOption: {
    name: string;
    value: string;
  }[];
  updateSettings: (updater: SettingsUpdaterInput) => void;

  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: SettingRadioChangeEvent) => void;

  // Direction
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: SettingRadioChangeEvent) => void;
  onChangeDirectionByLang: (lang: string) => void;

  // Layout
  onToggleLayout: VoidFunction;
  onChangeLayout: (event: SettingRadioChangeEvent) => void;

  // Contrast
  onToggleContrast: VoidFunction;
  onChangeContrast: (event: SettingRadioChangeEvent) => void;

  // Color
  onChangeColor: (event: SettingRadioChangeEvent) => void;

  // Font size
  onChangeFontSize: (event: SettingRangeChangeEvent) => void;
  onSetFontSize: (value: number) => void;

  // Stretch
  onToggleStretch: VoidFunction;

  // Reset
  onResetSetting: VoidFunction;
};
