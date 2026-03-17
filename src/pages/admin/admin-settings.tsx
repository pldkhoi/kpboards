import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '@/components/form';
import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { BellRingIcon, Globe2Icon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ----------------------------------------------------------------------
// Settings form schema — 14 Mar 2026

const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().optional(),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  weeklyReport: z.boolean().default(true),
  timezone: z.string().min(1, 'Timezone is required'),
  dateFormat: z.string().min(1, 'Date format is required'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const DEFAULT_VALUES: SettingsFormValues = {
  siteName: 'KPBoards Admin',
  siteDescription: 'Production-ready admin panel',
  emailNotifications: true,
  pushNotifications: false,
  weeklyReport: true,
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
};

const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern (America/New_York)' },
  { value: 'America/Los_Angeles', label: 'Pacific (America/Los_Angeles)' },
  { value: 'Europe/London', label: 'London (Europe/London)' },
  { value: 'Europe/Paris', label: 'Paris (Europe/Paris)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (Asia/Tokyo)' },
  { value: 'UTC', label: 'UTC' },
];

const DATE_FORMAT_OPTIONS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

// ----------------------------------------------------------------------

export default function AdminSettingsPage() {
  const { toast } = useToast();

  const methods = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: SettingsFormValues) => {
    toast({
      title: 'Settings saved',
      description: `Site: ${data.siteName}, Timezone: ${data.timezone}`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Tune presentation, notifications, and regional defaults for the demo admin workspace."
        actions={
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Safe local demo mode
          </Badge>
        }
      />

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="grid gap-4 py-6 md:grid-cols-3">
                <div className="rounded-[calc(var(--radius)*0.95)] border border-border/70 bg-background/60 p-4">
                  <SparklesIcon className="size-5 text-primary" />
                  <p className="mt-4 text-sm font-semibold">Visual polish</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Keep the product polished with consistent naming and presentation.
                  </p>
                </div>
                <div className="rounded-[calc(var(--radius)*0.95)] border border-border/70 bg-background/60 p-4">
                  <BellRingIcon className="size-5 text-primary" />
                  <p className="mt-4 text-sm font-semibold">Notification hygiene</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Control email, push, and weekly summary defaults without backend coupling.
                  </p>
                </div>
                <div className="rounded-[calc(var(--radius)*0.95)] border border-border/70 bg-background/60 p-4">
                  <Globe2Icon className="size-5 text-primary" />
                  <p className="mt-4 text-sm font-semibold">Regional defaults</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Improve timezone and formatting consistency for demos and reviews.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>Site identification and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RHFTextField name="siteName" label="Site name" placeholder="My App" />
                <RHFTextField
                  name="siteDescription"
                  label="Site description"
                  placeholder="Brief description"
                  multiline
                  minRows={2}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RHFSwitch name="emailNotifications" label="Email notifications" />
                <RHFSwitch name="pushNotifications" label="Push notifications" />
                <RHFSwitch name="weeklyReport" label="Weekly summary report" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional</CardTitle>
                <CardDescription>Timezone and date format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RHFSelect
                  name="timezone"
                  label="Timezone"
                  options={TIMEZONE_OPTIONS}
                  placeholder="Select timezone"
                />
                <RHFSelect
                  name="dateFormat"
                  label="Date format"
                  options={DATE_FORMAT_OPTIONS}
                  placeholder="Select format"
                />
              </CardContent>
            </Card>

            <div className="flex items-center gap-4">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="outline" onClick={() => methods.reset(DEFAULT_VALUES)}>
                Reset
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="bg-[linear-gradient(145deg,rgba(15,143,123,0.12),rgba(255,255,255,0.76)_55%,rgba(18,53,72,0.08))]">
              <CardHeader>
                <CardTitle>Environment summary</CardTitle>
                <CardDescription>
                  How this mock admin workspace is currently positioned.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-[calc(var(--radius)*0.9)] border border-border/70 bg-background/65 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Release
                  </p>
                  <p className="mt-2 text-sm font-semibold">Production-style frontend demo</p>
                </div>
                <div className="rounded-[calc(var(--radius)*0.9)] border border-border/70 bg-background/65 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Notifications
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    Email and weekly summary enabled by default
                  </p>
                </div>
                <div className="rounded-[calc(var(--radius)*0.9)] border border-border/70 bg-background/65 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Trust
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
                    <ShieldCheckIcon className="size-4 text-emerald-600" />
                    Safe local-only configuration
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </FormProvider>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Clear all data</Button>
        </CardContent>
      </Card>
    </div>
  );
}
