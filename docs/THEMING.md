# Theming Guide

## Overview

The theme system uses **Tailwind CSS 4** and **shadcn/ui** with CSS variables. Runtime customization is handled by `ThemeVariablesProvider` inside the Settings context. Users can switch between dark/light mode, color presets, contrast levels, and RTL layout direction.

## Theme Structure

```
src/
├── index.css                    # CSS variables (colors, breakpoints)
├── theme-provider.tsx           # Minimal wrapper (pass-through)
├── components/settings/
│   ├── theme-variables-provider.tsx  # Syncs settings to DOM
│   ├── theme-color-presets.tsx       # Color preset definitions
│   ├── theme-contrast.tsx            # Contrast toggle
│   ├── theme-mode.tsx                # Dark/light toggle
│   ├── theme-rtl-layout.tsx          # RTL layout
│   └── type.ts                       # ThemeColorPresets type
```

## Customizing Colors

Edit `src/index.css` to change the default palette:

```css
:root {
  --primary: #1ab7ad;
  --primary-foreground: #fff;
  --secondary: #960bdc;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
}
```

For runtime color presets, edit `src/components/settings/theme-color-presets.tsx` and add to `ThemeColorPresets` in `src/components/settings/type.ts`.

## Dark Mode

Dark mode is toggled via the Settings context. `ThemeVariablesProvider` applies the `.dark` class to `<html>`:

```typescript
import useSettings from 'hooks/use-settings';

function MyComponent() {
  const { themeMode, onToggleMode } = useSettings();
  // themeMode is 'light' or 'dark'
}
```

Tailwind's `dark:` variant handles dark-mode styles:

```tsx
<div className="bg-background text-foreground dark:bg-muted">
```

## RTL (Right-to-Left) Support

RTL is supported via the `dir` attribute and Tailwind's `rtl:` variant:

1. `ThemeVariablesProvider` sets `document.documentElement.setAttribute('dir', themeDirection)` when direction changes
2. Tailwind's `rtl:` variant handles layout mirroring
3. The settings context exposes `onChangeDirectionByLang(lang)` which sets RTL for Arabic (`'ar'`)

### Manual RTL Toggle

```typescript
const { onToggleDirection } = useSettings();
// Toggles between 'ltr' and 'rtl'
```

## Breakpoints

Breakpoints are defined in `src/index.css`:

```css
@theme {
  --breakpoint-sm: 600px;
  --breakpoint-md: 900px;
  --breakpoint-lg: 1366px;
  --breakpoint-xl: 1536px;
}
```

Use with `useResponsive` hook:

```typescript
import useResponsive from 'hooks/use-responsive';

const isDesktop = useResponsive('up', 'lg');
const isMobile = useResponsive('down', 'sm');
```

## Component Styling

Use Tailwind classes and shadcn components. Colors come from CSS variables:

- `bg-primary`, `text-primary-foreground`
- `bg-background`, `text-foreground`
- `bg-muted`, `text-muted-foreground`
- `border-border`, `ring-ring`
