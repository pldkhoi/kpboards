# Storybook

Component documentation and development environment.

## Run Storybook

```bash
yarn storybook
```

Opens at [http://localhost:6006](http://localhost:6006).

## Build static Storybook

```bash
yarn build-storybook
```

Outputs to `storybook-static/` for deployment.

## Writing Stories

Add `*.stories.tsx` files next to components or in `src/stories/`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyComponent } from './my-component';

const meta = {
  title: 'Category/MyComponent',
  component: MyComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Hello' },
};
```

## Addons

- **a11y** — Accessibility checks
- **docs** — Auto-generated documentation
- **controls** — Interactive prop editing
