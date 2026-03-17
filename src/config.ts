// components
import { type SettingsValueProps } from './components/settings/type';
import { env } from './env';

// API
// ----------------------------------------------------------------------

export const HOST_API = env.VITE_API_ENDPOINT;
export const AUTH_API = env.VITE_AUTH_API_ENDPOINT;

// CONFIG
// ----------------------------------------------------------------------

export const VITE_LOCAL_TOKEN = env.VITE_LOCAL_TOKEN;
export const X_APP_ID = env.VITE_X_APP_ID;
export const RELEASE_VERSION = env.VITE_RELEASE_VERSION;
export const X_LOCAL_TIMEZONE_ID = env.VITE_X_LOCAL_TIMEZONE_ID;

// LAYOUT
// ----------------------------------------------------------------------

export const CUSTOM = {
  BG_COLOR_HEADER: '#0E142D',
  BG_COLOR: '#111B27',
  BG_COLOR_VIDEO: '#162434',
  BD_COLOR_VIDEO: '#253C57',
  BG_COLOR_HOME_7: '#1A0C42',
};

export const HEADER = {
  MOBILE_HEIGHT: 56,
  MAIN_DESKTOP_HEIGHT: 75,
  DASHBOARD_DESKTOP_HEIGHT: 0,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 77,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 24,
  NAVBAR_ITEM_HORIZONTAL: 30,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings: SettingsValueProps = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'horizontal',
  themeColorPresets: 'default',
  themeFontSize: 16,
  themeStretch: true,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
];

export const defaultLang = allLangs[0]; // English
