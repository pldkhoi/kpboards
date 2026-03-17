import type { ReactNode } from 'react';

// ----------------------------------------------------------------------
// Passthrough. Contrast can be handled via Tailwind dark mode if needed.
// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ThemeContrast({ children }: Props) {
  return <>{children}</>;
}
