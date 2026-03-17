# Hooks Catalog

## Auth & Settings

| Hook | Path | Purpose |
|------|------|---------|
| useAuth | `@/hooks/use-auth` | Access auth context (user, login, logout) |
| useSettings | `@/hooks/use-settings` | Access theme settings (mode, direction) |
| useQueryAuth | `@/hooks/use-query-auth` | TanStack Query auth mutations |
| useQueryUser | `@/hooks/use-query-user` | TanStack Query user queries |

## UI & Layout

| Hook | Path | Purpose |
|------|------|---------|
| useResponsive | `@/hooks/use-responsive` | Breakpoint queries (isDesktop, isMobile) |
| useOffSetTop | `@/hooks/use-off-set-top` | Scroll offset for sticky headers |
| useToggle | `@/hooks/use-toggle` | Boolean toggle state |
| useCollapseDrawer | `@/hooks/use-collapse-drawer` | Dashboard sidebar collapse state |

## Data & Storage

| Hook | Path | Purpose |
|------|------|---------|
| useLocalStorage | `@/hooks/use-local-storage` | Synced localStorage state |
| useTable | `@/hooks/use-table` | Table pagination/sort/selection state |

## Utilities

| Hook | Path | Purpose |
|------|------|---------|
| useIsMountedRef | `@/hooks/use-is-mounted-ref` | Ref for mount status |
| useResizeObserver | `@/hooks/use-resize-observer` | Element resize observer |
| useTabs | `@/hooks/use-tabs` | Tab index state |
