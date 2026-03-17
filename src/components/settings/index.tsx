import SettingsDrawer from './drawer';
import ThemeColorPresets from './theme-color-presets';
import ThemeContrast from './theme-contrast';
import ThemeVariablesProvider from './theme-variables-provider';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeColorPresets>
      <ThemeVariablesProvider>
        <ThemeContrast>
          {children}
          <SettingsDrawer />
        </ThemeContrast>
      </ThemeVariablesProvider>
    </ThemeColorPresets>
  );
}
