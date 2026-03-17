// _types
import { type TypographyVariantType } from '@/types/typography';
// hooks
import useResponsive from '@/hooks/use-responsive';

// ----------------------------------------------------------------------

function useWidth() {
  const reponsiveXl = useResponsive('up', 'xl');
  const reponsiveLg = useResponsive('up', 'lg');
  const reponsiveMd = useResponsive('up', 'md');
  const reponsiveSm = useResponsive('up', 'sm');
  const reponsiveXs = useResponsive('up', 'xs');
  if (reponsiveXl) return 'xl';
  if (reponsiveLg) return 'lg';
  if (reponsiveMd) return 'md';
  if (reponsiveSm) return 'sm';
  if (reponsiveXs) return 'xs';
  return 'xs';
}

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// Static typography map (fallback when no MUI theme)
const FONT_MAP: Record<
  string,
  { fontSize: number; lineHeight: number; fontWeight: number; letterSpacing?: number }
> = {
  h1: { fontSize: 96, lineHeight: 112, fontWeight: 300 },
  h2: { fontSize: 60, lineHeight: 72, fontWeight: 300 },
  h3: { fontSize: 48, lineHeight: 56, fontWeight: 400 },
  h4: { fontSize: 34, lineHeight: 42, fontWeight: 400 },
  h5: { fontSize: 24, lineHeight: 32, fontWeight: 400 },
  h6: { fontSize: 20, lineHeight: 32, fontWeight: 500 },
  subtitle1: { fontSize: 16, lineHeight: 28, fontWeight: 400 },
  subtitle2: { fontSize: 14, lineHeight: 21, fontWeight: 500 },
  body1: { fontSize: 16, lineHeight: 24, fontWeight: 400 },
  body2: { fontSize: 14, lineHeight: 20, fontWeight: 400 },
  caption: { fontSize: 12, lineHeight: 20, fontWeight: 400 },
  overline: { fontSize: 12, lineHeight: 32, fontWeight: 500 },
  button: { fontSize: 14, lineHeight: 24, fontWeight: 500 },
};

function getFallbackFontValue(variant: TypographyVariantType) {
  const mapped = FONT_MAP[variant] ?? FONT_MAP.body1;
  return {
    fontSize: mapped.fontSize,
    lineHeight: mapped.lineHeight,
    fontWeight: mapped.fontWeight,
    letterSpacing: mapped.letterSpacing ?? 0,
  };
}

// ----------------------------------------------------------------------

export default function GetFontValue(variant: TypographyVariantType) {
  const breakpoints = useWidth();

  const hasResponsive =
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6';

  // Use responsive breakpoint for headings (simplified)
  const effectiveVariant = hasResponsive && breakpoints !== 'xl' ? variant : variant;
  const base = getFallbackFontValue(effectiveVariant as TypographyVariantType);

  return { ...base, lineHeight: base.lineHeight };
}
