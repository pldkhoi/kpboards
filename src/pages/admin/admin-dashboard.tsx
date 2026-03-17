import { BarChart, LineChart, PieChart } from '@/components/charts';
import PageHeader from '@/components/page-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowUpRightIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react';

// ----------------------------------------------------------------------
// Sample data — updated 14 Mar 2026

const STAT_CARDS = [
  {
    title: 'Total Revenue',
    description: 'From last month',
    value: '$45,231.89',
    icon: DollarSignIcon,
  },
  {
    title: 'Active Users',
    description: 'Active now',
    value: '+2,350',
    icon: UsersIcon,
  },
  {
    title: 'Sales',
    description: 'This month',
    value: '+12,234',
    icon: ShoppingCartIcon,
  },
  {
    title: 'Conversion Rate',
    description: 'Last 30 days',
    value: '3.2%',
    icon: TrendingUpIcon,
  },
];

const RECENT_SALES = [
  { name: 'Olivia Martin', initials: 'OM', amount: '$1,999.00' },
  { name: 'Jackson Lee', initials: 'JL', amount: '$2,350.00' },
  { name: 'Isabella Nguyen', initials: 'IN', amount: '$1,234.00' },
  { name: 'William Kim', initials: 'WK', amount: '$3,456.00' },
  { name: 'Sofia Davis', initials: 'SD', amount: '$987.00' },
];

const MONTHLY_DATA = [
  { name: 'Oct', value: 380 },
  { name: 'Nov', value: 420 },
  { name: 'Dec', value: 510 },
  { name: 'Jan', value: 590 },
  { name: 'Feb', value: 620 },
  { name: 'Mar', value: 710 },
];

const TREND_DATA = [
  { name: 'Oct', value: 380 },
  { name: 'Nov', value: 420 },
  { name: 'Dec', value: 510 },
  { name: 'Jan', value: 590 },
  { name: 'Feb', value: 620 },
  { name: 'Mar', value: 710 },
];

const TRAFFIC_BY_SOURCE = [
  { name: 'Direct', value: 1240 },
  { name: 'Organic', value: 980 },
  { name: 'Social', value: 620 },
  { name: 'Referral', value: 410 },
  { name: 'Email', value: 290 },
];

// ----------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard Overview"
        description="A cleaner operational snapshot for the mock admin workspace with revenue, growth, traffic, and recent customer activity."
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Demo data active
            </Badge>
            <Button variant="outline" size="sm">
              Export report
            </Button>
          </div>
        }
      />

      <Card className="overflow-hidden border-transparent bg-[linear-gradient(135deg,rgba(15,143,123,0.12),rgba(255,255,255,0.76)_42%,rgba(18,53,72,0.08))]">
        <CardContent className="grid gap-6 py-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
              Performance pulse
            </span>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Revenue and engagement are trending up this month.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                The current mock state highlights healthier conversion, stronger sales momentum, and
                a more focused summary of what needs attention today.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[calc(var(--radius)*1.05)] border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Today
              </p>
              <p className="mt-3 text-2xl font-semibold text-foreground">$8.4k</p>
              <p className="mt-1 text-sm text-emerald-600">+14.8% from yesterday</p>
            </div>
            <div className="rounded-[calc(var(--radius)*1.05)] border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Conversion
              </p>
              <p className="mt-3 text-2xl font-semibold text-foreground">3.2%</p>
              <p className="mt-1 text-sm text-muted-foreground">Healthy funnel for demo traffic</p>
            </div>
            <div className="rounded-[calc(var(--radius)*1.05)] border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                SLA
              </p>
              <p className="mt-3 text-2xl font-semibold text-foreground">98.4%</p>
              <p className="mt-1 text-sm text-muted-foreground">No backlog spikes today</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0.9))] dark:bg-card"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <ArrowUpRightIcon className="size-3.5 text-emerald-600" />
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Last 5 transactions in the mock workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {RECENT_SALES.map((sale) => (
                <li
                  key={sale.name}
                  className="flex items-center gap-4 rounded-[calc(var(--radius)*0.9)] border border-border/65 bg-background/55 px-3 py-3"
                >
                  <Avatar size="sm">
                    <AvatarFallback className="text-xs">{sale.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium">{sale.name}</p>
                    <p className="text-xs text-muted-foreground">Transaction</p>
                  </div>
                  <p className="text-sm font-medium">{sale.amount}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>Revenue over the last 6 months (Oct 2025 – Mar 2026)</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={MONTHLY_DATA} height={300} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Line chart for Q4 2025 – Q1 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={TREND_DATA} height={280} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic by Source</CardTitle>
            <CardDescription>Visitor breakdown by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={TRAFFIC_BY_SOURCE} height={280} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
