import { type ThemeColorPresets } from '@/components/settings/type';

// ----------------------------------------------------------------------
// Standalone color presets (no MUI dependency).
// Mirrors structure from original get-color-presets for ThemeVariablesProvider.
// ----------------------------------------------------------------------

const GREY_800 = '#212B36';

export const colorPresets = [
  // DEFAULT (matches index.css --primary: #1ab7ad)
  {
    name: 'default',
    lighter: '#E7FFF6',
    light: '#74E2D8',
    main: '#1ab7ad',
    dark: '#149289',
    darker: '#0E6C65',
    contrastText: '#fff',
  },
  // INDIGO
  {
    name: 'indigo',
    lighter: '#E4E8FF',
    light: '#A7B3FF',
    main: '#4F46E5',
    dark: '#3730A3',
    darker: '#1F1B66',
    contrastText: '#fff',
  },
  // VIOLET
  {
    name: 'violet',
    lighter: '#EFE5FF',
    light: '#C9A6FF',
    main: '#7C3AED',
    dark: '#5B21B6',
    darker: '#3C1778',
    contrastText: '#fff',
  },
  // CYAN
  {
    name: 'cyan',
    lighter: '#DDF8FF',
    light: '#8AE8FF',
    main: '#06B6D4',
    dark: '#0E7490',
    darker: '#155E75',
    contrastText: GREY_800,
  },
  // SKY
  {
    name: 'sky',
    lighter: '#E0F2FF',
    light: '#90D6FF',
    main: '#0EA5E9',
    dark: '#0369A1',
    darker: '#0C4A6E',
    contrastText: '#fff',
  },
  // EMERALD
  {
    name: 'emerald',
    lighter: '#DBFCE8',
    light: '#86EFAD',
    main: '#10B981',
    dark: '#047857',
    darker: '#065F46',
    contrastText: '#fff',
  },
  // TEAL
  {
    name: 'teal',
    lighter: '#DFFAF6',
    light: '#7FE7D8',
    main: '#14B8A6',
    dark: '#0F766E',
    darker: '#115E59',
    contrastText: '#fff',
  },
  // AMBER
  {
    name: 'amber',
    lighter: '#FFF7D6',
    light: '#FDE68A',
    main: '#F59E0B',
    dark: '#B45309',
    darker: '#78350F',
    contrastText: GREY_800,
  },
  // ORANGE
  {
    name: 'orange',
    lighter: '#FFF0E3',
    light: '#FDBA74',
    main: '#F97316',
    dark: '#C2410C',
    darker: '#7C2D12',
    contrastText: GREY_800,
  },
  // ROSE
  {
    name: 'rose',
    lighter: '#FFE4EC',
    light: '#FDA4AF',
    main: '#F43F5E',
    dark: '#BE123C',
    darker: '#881337',
    contrastText: '#fff',
  },
  // FUCHSIA
  {
    name: 'fuchsia',
    lighter: '#FDE7FF',
    light: '#F5A2F7',
    main: '#D946EF',
    dark: '#A21CAF',
    darker: '#701A75',
    contrastText: '#fff',
  },
  // SLATE
  {
    name: 'slate',
    lighter: '#E5EAF2',
    light: '#94A3B8',
    main: '#475569',
    dark: '#334155',
    darker: '#1E293B',
    contrastText: '#fff',
  },
];

export const defaultPreset = colorPresets[0];
export const indigoPreset = colorPresets[1];
export const violetPreset = colorPresets[2];
export const cyanPreset = colorPresets[3];
export const skyPreset = colorPresets[4];
export const emeraldPreset = colorPresets[5];
export const tealPreset = colorPresets[6];
export const amberPreset = colorPresets[7];
export const orangePreset = colorPresets[8];
export const rosePreset = colorPresets[9];
export const fuchsiaPreset = colorPresets[10];
export const slatePreset = colorPresets[11];

export default function getColorPresets(presetsKey: ThemeColorPresets) {
  return {
    indigo: indigoPreset,
    violet: violetPreset,
    cyan: cyanPreset,
    sky: skyPreset,
    emerald: emeraldPreset,
    teal: tealPreset,
    amber: amberPreset,
    orange: orangePreset,
    rose: rosePreset,
    fuchsia: fuchsiaPreset,
    slate: slatePreset,
    default: defaultPreset,
  }[presetsKey];
}
