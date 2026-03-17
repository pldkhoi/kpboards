---
name: frontend-patterns
description: Frontend development patterns for React, Next.js, state management, performance optimization, and UI best practices. Use when building React components, implementing state management, optimizing performance, handling forms, creating animations, or working on accessibility features.
---

# Frontend Development Patterns

Modern frontend patterns for React and performant user interfaces, customized for this project's stack (React 19, shadcn/Tailwind, Zustand 5, React Hook Form).

## Component Patterns

### Composition Over Inheritance
Create flexible components using `children` and explicit typed props rather than monolithic configurations.

### Compound Components
Use Context to link related components (e.g., Tabs, TabList, TabPanel) natively.

### Render Props / Custom Hooks for Data
Extract data-fetching logic into `src/hooks/use-query-*` custom hooks wrapping `useQuery`. Do not fetch directly in UI components. Do not call raw axios methods in components; use `sendGet`, `sendPost` from `src/utils/axios.ts`.

## State Management Patterns

### Zustand for Global State
Create focused slices in `src/store/`. Avoid deeply nested state objects. Use selectors to prevent unnecessary re-renders.

```typescript
export const useMyStore = create<MyState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## Performance Optimization

### React 19 Compiler (CRITICAL)
- **Do NOT manually use `useMemo` or `useCallback`**. The project uses the `babel-plugin-react-compiler`. 
- Manual memoization is an anti-pattern unless you are explicitly bailing out of the compiler or wrapping third-party libraries that demand stable references. Code naturally, let the compiler optimize.

### Virtualization
For long lists or tables (e.g., 100+ items), implement virtualization (like `@tanstack/react-virtual`) to only render visible DOM nodes.

## Form Handling
- **Always use React Hook Form + Zod.**
- Extract validation schemas into separate constants or files.
- Use the `FormProvider` wrapper from `components/form` to inject context cleanly.

## Framer Motion Animations
Wrap map iterations in `<AnimatePresence>` for list animations. Provide `initial`, `animate`, `exit`, and `transition` props cleanly via `motion.div`.

## Accessibility (a11y)
- **Keyboard Navigation**: Ensure custom components (like custom dropdowns) support Arrow keys, Enter, and Escape.
- **Focus Management**: Manage focus manually when opening/closing Modals or custom drawers (shadcn Dialog natively handles most of this, but be aware when creating custom overlays).
