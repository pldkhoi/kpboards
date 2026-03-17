# Charts (Recharts)

The project uses [Recharts](https://recharts.org/) for data visualization. Charts use CSS variables for theming (dark/light mode).

## LineChart

```tsx
import { LineChart } from '@/components/charts';

<LineChart
  data={[
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
  ]}
  dataKey="value"
  xKey="name"
  height={300}
/>
```

## BarChart

```tsx
import { BarChart } from '@/components/charts';

<BarChart data={data} dataKey="value" xKey="name" height={300} />
```

## PieChart

```tsx
import { PieChart } from '@/components/charts';

<PieChart
  data={[
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ]}
  height={300}
/>
```

## Theming

Charts use `hsl(var(--primary))` and `hsl(var(--muted-foreground))` by default, so they adapt to the theme. Override with `strokeColor` or `fillColor` props.
