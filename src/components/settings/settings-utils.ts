import type {
  SettingsState,
  SettingsUpdaterInput,
  ThemeColorPresets,
  ThemeContrast,
  ThemeDirection,
  ThemeEffectiveMode,
  ThemeLayout,
  ThemeMode,
} from '@/components/settings/type';

const THEME_MODES: ThemeMode[] = ['light', 'dark', 'system'];
const THEME_DIRECTIONS: ThemeDirection[] = ['ltr', 'rtl'];
const THEME_CONTRASTS: ThemeContrast[] = ['soft', 'default', 'bold'];
const THEME_LAYOUTS: ThemeLayout[] = ['horizontal', 'vertical'];
const THEME_PRESETS: ThemeColorPresets[] = [
  'default',
  'indigo',
  'violet',
  'cyan',
  'sky',
  'emerald',
  'teal',
  'amber',
  'orange',
  'rose',
  'fuchsia',
  'slate',
];

export const FONT_SIZE_MIN = 14;
export const FONT_SIZE_MAX = 20;
export const FONT_SIZE_DEFAULT = 16;
const LEGACY_FONT_SIZE_MAP = { sm: 14, md: 16, lg: 18 } as const;
const LEGACY_PRESET_MAP: Record<string, ThemeColorPresets> = {
  purple: 'violet',
  blue: 'sky',
  red: 'rose',
};

const has = <T extends string>(options: readonly T[], value: unknown): value is T =>
  typeof value === 'string' && options.includes(value as T);

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const getNextFromList = <T extends string>(list: readonly T[], current: T): T => {
  const currentIndex = list.indexOf(current);
  return list[(currentIndex + 1) % list.length];
};

export function clampFontSize(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return FONT_SIZE_DEFAULT;
  }

  return Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, Math.round(value)));
}

export function resolveFontSizePx(value: number): number {
  return clampFontSize(value);
}

export function parseFontSizeInput(raw: string, fallback = FONT_SIZE_DEFAULT): number {
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return clampFontSize(parsed);
}

export function normalizeSettings(raw: unknown, defaults: SettingsState): SettingsState {
  if (!isObjectRecord(raw)) {
    return defaults;
  }

  const rawPreset = typeof raw.themeColorPresets === 'string' ? raw.themeColorPresets : '';
  const migratedPreset = LEGACY_PRESET_MAP[rawPreset] ?? rawPreset;
  const rawFontSize =
    typeof raw.themeFontSize === 'string' && raw.themeFontSize in LEGACY_FONT_SIZE_MAP
      ? LEGACY_FONT_SIZE_MAP[raw.themeFontSize as keyof typeof LEGACY_FONT_SIZE_MAP]
      : raw.themeFontSize;

  return {
    themeMode: has(THEME_MODES, raw.themeMode) ? raw.themeMode : defaults.themeMode,
    themeLayout: has(THEME_LAYOUTS, raw.themeLayout) ? raw.themeLayout : defaults.themeLayout,
    themeStretch: typeof raw.themeStretch === 'boolean' ? raw.themeStretch : defaults.themeStretch,
    themeContrast: has(THEME_CONTRASTS, raw.themeContrast)
      ? raw.themeContrast
      : defaults.themeContrast,
    themeDirection: has(THEME_DIRECTIONS, raw.themeDirection)
      ? raw.themeDirection
      : defaults.themeDirection,
    themeColorPresets: has(THEME_PRESETS, migratedPreset)
      ? migratedPreset
      : defaults.themeColorPresets,
    themeFontSize: clampFontSize(
      typeof rawFontSize === 'number' ? rawFontSize : defaults.themeFontSize
    ),
  };
}

export function resolveThemeMode(
  mode: ThemeMode,
  prefersDark: boolean | undefined
): ThemeEffectiveMode {
  if (mode === 'system') {
    return prefersDark ? 'dark' : 'light';
  }

  return mode;
}

export function toPersistedSettings(state: SettingsState): SettingsState {
  return { ...state, themeFontSize: clampFontSize(state.themeFontSize) };
}

export function applySettingsUpdate(
  prev: SettingsState,
  updater: SettingsUpdaterInput,
  defaults: SettingsState
): SettingsState {
  const nextState = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
  return normalizeSettings(nextState, defaults);
}

export function toggleThemeMode(current: ThemeMode): ThemeMode {
  return getNextFromList(THEME_MODES, current);
}

export function toggleDirection(current: ThemeDirection): ThemeDirection {
  return getNextFromList(THEME_DIRECTIONS, current);
}

export function toggleLayout(current: ThemeLayout): ThemeLayout {
  return getNextFromList(THEME_LAYOUTS, current);
}

export function toggleContrast(current: ThemeContrast): ThemeContrast {
  return getNextFromList(THEME_CONTRASTS, current);
}

export function isSettingsEqual(input: Partial<SettingsState>, defaults: SettingsState): boolean {
  const normalized = normalizeSettings(input, defaults);

  return (
    normalized.themeMode === defaults.themeMode &&
    normalized.themeLayout === defaults.themeLayout &&
    normalized.themeStretch === defaults.themeStretch &&
    normalized.themeContrast === defaults.themeContrast &&
    normalized.themeDirection === defaults.themeDirection &&
    normalized.themeColorPresets === defaults.themeColorPresets &&
    normalized.themeFontSize === defaults.themeFontSize
  );
}
