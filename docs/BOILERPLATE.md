# kpboards — Boilerplate Specification

Production-ready React + Vite boilerplate for building admin dashboards, SaaS apps, and web applications. Designed for autonomous 24/7 development with minimal approval friction.

**Last updated**: 14 March 2026

---

## 1. 24/7 Autonomous Development

### How to Run Autonomously

1. **Enable autonomous mode** in your prompt:

   ```
   Build the admin dashboard. Work autonomously. I will review at the end.
   ```

2. **Cursor settings** (Settings → Agents):
   - Enable **Background Agent** (Settings → Beta)
   - Configure **terminal allowlist** for `bun run lint`, `bun run build`, `bun test`
   - Optionally disable external file edit protection (restart required)

3. **Rules that enable autonomy** (`.cursor/rules/`):
   - `autonomous-workflow.mdc` — Plan → Implement → Self-review → Deliver
   - `fresh-data.mdc` — Use current date (14 Mar 2026), search web for fresh docs
   - `security.mdc` — Security checklist applied by default

4. **Agent orchestration**:
   - Use `/orchestrate feature "description"` for full pipeline
   - Planner proceeds without confirmation when "autonomous" or "24/7" is in the prompt

---

## 2. Component Inventory & Examples

### 2.1 UI Primitives (shadcn)

| Component     | Path                            | Example                                                 |
| ------------- | ------------------------------- | ------------------------------------------------------- |
| Button        | `@/components/ui/button`        | `<Button variant="default">Save</Button>`               |
| Input         | `@/components/ui/input`         | `<Input placeholder="Email" />`                         |
| Label         | `@/components/ui/label`         | `<Label>Name</Label>`                                   |
| Checkbox      | `@/components/ui/checkbox`      | `<Checkbox />`                                          |
| Select        | `@/components/ui/select`        | `<Select><SelectTrigger/><SelectContent/></Select>`     |
| Switch        | `@/components/ui/switch`        | `<Switch checked={on} onCheckedChange={setOn} />`       |
| Textarea      | `@/components/ui/textarea`      | `<Textarea rows={4} />`                                 |
| Dialog        | `@/components/ui/dialog`        | `<Dialog><DialogTrigger/><DialogContent/></Dialog>`     |
| Sheet         | `@/components/ui/sheet`         | Slide-over panel                                        |
| Popover       | `@/components/ui/popover`       | `<Popover><PopoverTrigger/><PopoverContent/></Popover>` |
| Dropdown Menu | `@/components/ui/dropdown-menu` | Context menus                                           |
| Tabs          | `@/components/ui/tabs`          | `<Tabs><TabsList/><TabsContent/></Tabs>`                |
| Card          | `@/components/ui/card`          | `<Card><CardHeader/><CardContent/></Card>`              |
| Alert         | `@/components/ui/alert`         | `<Alert variant="destructive">Error</Alert>`            |
| Badge         | `@/components/ui/badge`         | `<Badge variant="secondary">New</Badge>`                |
| Avatar        | `@/components/ui/avatar`        | `<Avatar><AvatarImage/><AvatarFallback/></Avatar>`      |
| Breadcrumb    | `@/components/ui/breadcrumb`    | Navigation breadcrumbs                                  |
| Calendar      | `@/components/ui/calendar`      | Date picker                                             |
| Progress      | `@/components/ui/progress`      | `<Progress value={60} />`                               |
| Scroll Area   | `@/components/ui/scroll-area`   | Custom scrollbar                                        |
| Separator     | `@/components/ui/separator`     | `<Separator />`                                         |
| Skeleton      | `@/components/ui/skeleton`      | Loading placeholder                                     |
| Table         | `@/components/ui/table`         | `<Table><TableHeader/><TableBody/></Table>`             |
| Tooltip       | `@/components/ui/tooltip`       | `<Tooltip><TooltipTrigger/><TooltipContent/></Tooltip>` |

### 2.2 Form Components (RHF + Zod)

```tsx
import { FormProvider, RHFTextField, RHFSelect, RHFDatePicker } from '@/components/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
});

type FormValues = z.infer<typeof schema>;

function MyForm() {
  const methods = useForm<FormValues>({ resolver: zodResolver(schema) });
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <RHFTextField name="name" label="Name" />
      <RHFTextField name="email" label="Email" />
    </FormProvider>
  );
}
```

| Component       | Path                    | Use Case                     |
| --------------- | ----------------------- | ---------------------------- |
| FormProvider    | `form/form-provider`    | Wraps form, provides context |
| RHFTextField    | `form/rhf-text-field`   | Text, email, password        |
| RHFNumberField  | `form/rhf-number-field` | Numbers                      |
| RHFSelect       | `form/rhf-select`       | Dropdown select              |
| RHFCheckbox     | `form/rhf-checkbox`     | Boolean checkbox             |
| RHFRadioGroup   | `form/rhf-radio-group`  | Radio options                |
| RHFSwitch       | `form/rhf-switch`       | Toggle switch                |
| RHFDatePicker   | `form/rhf-date-picker`  | Date selection               |
| RHFTimePicker   | `form/rhf-time-picker`  | Time selection               |
| RHFAutocomplete | `form/rhf-autocomplete` | Searchable autocomplete      |
| RHFUpload       | `form/rhf-upload`       | File upload (single/multi)   |

### 2.3 Table Components

```tsx
import { DataTable } from '@/components/table';
import type { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  createActionsColumn({ onEdit, onDelete }),
];

<DataTable
  columns={columns}
  data={users}
  isLoading={isLoading}
  enablePagination
  enableSearch
  searchPlaceholder="Search users..."
/>;
```

| Component            | Path                           | Purpose                                                   |
| -------------------- | ------------------------------ | --------------------------------------------------------- |
| DataTable            | `table/data-table`             | Full-featured table (sort, search, pagination, selection) |
| TableSkeleton        | `table/table-skeleton`         | Loading state                                             |
| TableNoData          | `table/table-no-data`          | Empty state                                               |
| TableSelectedActions | `table/table-selected-actions` | Bulk actions                                              |
| createActionsColumn  | `table/table-actions-column`   | Edit/delete column                                        |

### 2.4 Charts

```tsx
import { BarChart, LineChart, PieChart } from '@/components/charts';

<BarChart data={[{ name: 'Jan', value: 400 }]} height={300} />
<LineChart data={chartData} />
<PieChart data={pieData} />
```

### 2.5 Layout & Navigation

| Component               | Path                         | Purpose                               |
| ----------------------- | ---------------------------- | ------------------------------------- |
| AdminLayout             | `admin-layout`               | Admin panel layout (sidebar + header) |
| AdminSidebar            | `admin-layout/admin-sidebar` | Collapsible sidebar                   |
| AdminHeader             | `admin-layout/admin-header`  | Top bar with breadcrumb, search       |
| Page                    | `page`                       | Page wrapper with title, meta         |
| PageBreadcrumbs         | `page-breadcrumbs`           | Breadcrumb nav for page headers       |
| PageHeader              | `page-header`                | Title, subtitle, optional actions row |
| NavSection (vertical)   | `nav-section/vertical`       | Vertical nav list                     |
| NavSection (horizontal) | `nav-section/horizontal`     | Horizontal nav                        |

### 2.6 Feedback & Overlay

| Component        | Path                | Purpose              |
| ---------------- | ------------------- | -------------------- |
| LoadingScreen    | `loading-screen`    | Full-screen loader   |
| Loading          | `loading`           | Inline spinner       |
| LoadingOverlay   | `loading-overlay`   | Overlay during async |
| ConfirmDialog    | `confirm-dialog`    | Yes/no confirmation  |
| ToasterContainer | `toaster-container` | Sonner toasts        |
| NoDataFound      | `no-data-found`     | Empty state          |
| EmptyContent     | `empty-content`     | Empty content block  |

### 2.7 Animations (Framer Motion)

```tsx
import { MotionContainer, MotionViewport, TextAnimate, DialogAnimate } from '@/components/animate';

<MotionViewport>
  <MotionContainer>...</MotionContainer>
</MotionViewport>
<TextAnimate text="Hello" />
```

| Component           | Path                            | Purpose               |
| ------------------- | ------------------------------- | --------------------- |
| MotionContainer     | `animate/motion-container`      | Stagger children      |
| MotionViewport      | `animate/motion-viewport`       | In-viewport trigger   |
| MotionLazyContainer | `animate/motion-lazy-container` | Lazy motion           |
| TextAnimate         | `animate/text-animate`          | Animated text         |
| DialogAnimate       | `animate/dialog-animate`        | Animated modal        |
| FabButtonAnimate    | `animate/fab-button-animate`    | FAB with animation    |
| IconButtonAnimate   | `animate/icon-button-animate`   | Icon button animation |

### 2.8 Upload

| Component        | Path                        | Purpose             |
| ---------------- | --------------------------- | ------------------- |
| UploadSingleFile | `upload/upload-single-file` | Single file upload  |
| UploadMultiFile  | `upload/upload-multi-file`  | Multiple files      |
| UploadAvatar     | `upload/upload-avatar`      | Avatar image upload |

### 2.9 Other

| Component      | Path                      | Purpose                      |
| -------------- | ------------------------- | ---------------------------- |
| Logo           | `logo`                    | App logo                     |
| Avatar         | `avatar`                  | User avatar                  |
| Iconify        | `iconify`                 | Icon component (iconify.dev) |
| Scrollbar      | `scrollbar`               | Custom scrollbar             |
| CommandPalette | `command-palette`         | Cmd+K command palette        |
| RichTextEditor | `editor/rich-text-editor` | TipTap WYSIWYG               |
| SortableList   | `sortable-list`           | Drag-and-drop list           |
| VirtualList    | `virtual-list`            | Virtualized list             |

---

## 3. Pages & Routes

### 3.1 Public Pages

| Path         | Page           | Layout                      |
| ------------ | -------------- | --------------------------- |
| `/`          | Landing (home) | MainLayout                  |
| `/pages`     | Pages index    | MainLayout                  |
| `/portfolio` | Portfolio      | MainLayout                  |
| `/documents` | Documentation  | MainLayout                  |
| `/login`     | Login          | LogoOnlyLayout (GuestGuard) |
| `/register`  | Register       | LogoOnlyLayout (GuestGuard) |

### 3.1b Broker / Consumer (Placeholders)

| Path                       | Page        | Layout     |
| -------------------------- | ----------- | ---------- |
| `/broker/privacy-notice`   | Placeholder | MainLayout |
| `/broker/terms`            | Placeholder | MainLayout |
| `/consumer/privacy-notice` | Placeholder | MainLayout |
| `/consumer/terms`          | Placeholder | MainLayout |

### 3.2 Dashboard (Protected via AuthGuard)

| Path                    | Page                   | Layout          |
| ----------------------- | ---------------------- | --------------- |
| `/dashboard`            | Dashboard              | DashboardLayout |
| `/dashboard/user`       | User list              | DashboardLayout |
| `/dashboard/task`       | Task list              | DashboardLayout |
| `/dashboard/time-entry` | Time entries           | DashboardLayout |
| `/dashboard/components` | **Component Showcase** | DashboardLayout |
| `/dashboard/profile`    | User profile           | DashboardLayout |

### 3.3 Admin (Protected via AuthGuard, AdminLayout)

| Path                | Page                                              | Layout      |
| ------------------- | ------------------------------------------------- | ----------- |
| `/admin`            | Redirect to dashboard                             | AdminLayout |
| `/admin/dashboard`  | **Admin Dashboard** (stats, charts, recent sales) | AdminLayout |
| `/admin/users`      | Admin users (CRUD template pattern)               | AdminLayout |
| `/admin/roles`      | Roles & permissions module                        | AdminLayout |
| `/admin/products`   | Products module                                   | AdminLayout |
| `/admin/orders`     | Orders module                                     | AdminLayout |
| `/admin/audit-logs` | Audit logs module                                 | AdminLayout |
| `/admin/settings`   | Admin settings                                    | AdminLayout |
| `/admin/docs`       | Admin docs                                        | AdminLayout |

### 3.4 Admin Dashboard Example

`src/pages/admin/admin-dashboard.tsx` includes:

- **Stat cards** (Total Revenue, Active Users, Sales, Conversion Rate)
- **Recent Sales** list with avatars
- **Monthly Growth** bar chart
- Responsive grid (4 cols → 2 cols on smaller screens)

---

## 4. UI/UX Design System

### 4.1 Colors (2026 Best Practices)

- **Primary**: `#1ab7ad` (teal) — Default accent
- **Secondary**: `#960bdc` (purple)
- **Destructive**: `#e53937` (red)
- **Avoid pure black** (#000): use `oklch(0.145 0 0)` for dark mode backgrounds
- **Muted text**: `#637381` or `oklch(0.65 0 0)` in dark mode

**Color presets** (Settings drawer): default, purple, cyan, blue, orange, red.

### 4.2 Typography

- **Font**: Geist Variable (`@fontsource-variable/geist`)
- **Font sizes**: xs, sm, base, lg — controlled via `themeFontSize` in settings
- **Headings**: Use semantic hierarchy (h1 2xl, h2 xl, etc.)

### 4.3 Spacing & Layout

- **Breakpoints**: sm 600px, md 900px, lg 1366px, xl 1536px
- **Radius**: `--radius: 0.625rem` (10px)
- **Sidebar**: 280px expanded, 77px collapsed

### 4.4 Accessibility

- WCAG AA contrast (4.5:1 for text)
- Semantic HTML, ARIA where needed
- shadcn components are accessible by default
- `jsx-a11y` ESLint rules enabled

### 4.5 Dark Mode

- Toggle via Settings drawer or `themeMode`
- `.dark` class on `<html>`
- CSS variables switch in `src/index.css`

---

## 5. Programming Best Practices

### 5.1 File Naming

- **kebab-case**: `use-auth.ts`, `loading-screen.tsx`, `rhf-text-field.tsx`

### 5.2 Imports

- Prefer `@/` alias: `import Logo from '@/components/logo'`
- Never use `../../` beyond one level

### 5.3 Components

- Function components, typed props with `interface`
- No `React.FC`
- Use `cn()` for conditional classes

### 5.4 State

- **Server state**: TanStack React Query
- **Client state**: Zustand
- **Forms**: React Hook Form + Zod

### 5.5 API

- Use `utils/axios` helpers: `sendGet`, `sendPost`, `sendPut`, `sendPatch`, `sendDelete`
- Never raw `fetch` or new axios instances

### 5.6 Hooks

- `use-query-*` for data fetching
- `use-table` for table state
- Custom hooks in `src/hooks/`

---

## 6. Performance Guidelines

- **Lazy load routes** with `React.lazy()` + `Suspense`
- **Dynamic import** for heavy libs (charts, editor)
- **TanStack Virtual** for long lists
- **Skeleton** components for loading states
- **staleTime** in React Query to reduce refetches
- **Chunk size**: vendor ~1400 KB limit, index ~500 KB

---

## 7. Key Commands

```bash
bun dev              # Dev server (port 3000)
bun run build        # Production build
bun run lint         # ESLint
bun run prettier     # Format
bun run type-check   # TypeScript
bun test             # Vitest
bun run test:e2e     # Playwright
bun run storybook    # Storybook (port 6006)
```

---

## 8. Environment Variables

- Prefix: `VITE_` (e.g. `VITE_API_ENDPOINT`)
- Copy `.env.example` to `.env`
- Never put secrets in client bundle

---

## 9. Related Documentation

| Doc                                | Description         |
| ---------------------------------- | ------------------- |
| [COMPONENTS.md](COMPONENTS.md)     | Component catalog   |
| [FORMS.md](FORMS.md)               | Form patterns       |
| [TABLES.md](TABLES.md)             | Data tables         |
| [THEMING.md](THEMING.md)           | Theme customization |
| [AUTH.md](AUTH.md)                 | Authentication      |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Architecture        |
