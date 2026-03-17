import { cn } from '@/lib/utils';
import { Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';

// ----------------------------------------------------------------------

export interface PieChartProps {
  data: { name: string; value: number }[];
  height?: number;
  colors?: string[];
  className?: string;
}

const DEFAULT_COLORS = [
  'var(--primary)',
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--muted-foreground)',
];

// ----------------------------------------------------------------------

export default function PieChart({
  data,
  height = 300,
  colors = DEFAULT_COLORS,
  className,
}: PieChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
            }}
            formatter={(value: number) => [value, '']}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
