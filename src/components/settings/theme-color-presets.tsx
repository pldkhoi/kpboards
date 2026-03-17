import type { ReactNode } from 'react';

// ----------------------------------------------------------------------
// Passthrough. ThemeVariablesProvider handles color presets via CSS vars.
// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ThemeColorPresets({ children }: Props) {
  return <>{children}</>;
}
