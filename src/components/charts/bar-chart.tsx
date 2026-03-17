import { cn } from '@/lib/utils';
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// ----------------------------------------------------------------------

export interface BarChartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  xKey?: string;
  height?: number;
  fillColor?: string;
  className?: string;
}

// ----------------------------------------------------------------------

export default function BarChart({
  data,
  dataKey = 'value',
  xKey = 'name',
  height = 300,
  fillColor = 'var(--primary)',
  className,
}: BarChartProps) {
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={xKey} className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
          <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Bar dataKey={dataKey} fill={fillColor} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
