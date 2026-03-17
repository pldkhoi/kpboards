import { useSyncExternalStore } from 'react';

// Match MUI breakpoints: xs:0, sm:600, md:900, lg:1366, xl:1536
const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1366,
  xl: 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS | number;

function getBreakpointValue(key: Breakpoint): number {
  if (typeof key === 'number') return key;
  return BREAKPOINTS[key as keyof typeof BREAKPOINTS] ?? 0;
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return 0;
}

type Query = 'up' | 'down' | 'between' | 'only';
type Key = Breakpoint | number;
type Start = Breakpoint | number;
type End = Breakpoint | number;

export default function useResponsive(query: Query, key?: Key, start?: Start, end?: End): boolean {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const mediaUp = width >= getBreakpointValue((key ?? 0) as Key);
  const mediaDown = width < getBreakpointValue((key ?? 0) as Key);
  const mediaBetween =
    width >= getBreakpointValue((start ?? 0) as Start) &&
    width < getBreakpointValue((end ?? 0) as End);
  const nextKey = getBreakpointValue((key ?? 'xs') as Key);
  const nextBreakpoint =
    (Object.entries(BREAKPOINTS).find(([, v]) => v > nextKey)?.[1] ?? Infinity) - 1;
  const mediaOnly = width >= nextKey && width <= nextBreakpoint;

  if (query === 'up') return mediaUp;
  if (query === 'down') return mediaDown;
  if (query === 'between') return mediaBetween;
  return mediaOnly;
}
