import { cn } from '@/lib/utils';
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// ----------------------------------------------------------------------

export interface LineChartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  xKey?: string;
  height?: number;
  strokeColor?: string;
  className?: string;
}

// ----------------------------------------------------------------------

export default function LineChart({
  data,
  dataKey = 'value',
  xKey = 'name',
  height = 300,
  strokeColor = 'var(--primary)',
  className,
}: LineChartProps) {
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={2}
            dot={{ fill: strokeColor }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
