import CodeBlock from '@/components/admin-layout/code-block';
import BadgeStatus from '@/components/badge-status';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2Icon } from 'lucide-react';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function BadgeSection({ className }: Props) {
  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <h2 id="badges" className="text-xl font-semibold tracking-tight">
            Badges
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Status indicators, labels, and tags. Pill vs default shape, with icons, in cards and
            tables.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Variants</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">default</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="destructive">destructive</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="ghost">ghost</Badge>
            <Badge variant="link">link</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Pill shape</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">
              Pill badge
            </Badge>
            <Badge variant="default" className="rounded-full">
              Active
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">With icons</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2Icon className="size-3.5" aria-hidden />
              Verified
            </Badge>
            <Badge variant="outline" className="gap-1">
              <CheckCircle2Icon className="size-3.5" aria-hidden />
              Complete
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">BadgeStatus (status dots)</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2">
              <BadgeStatus status="online" />
              <span className="text-sm">online</span>
            </span>
            <span className="flex items-center gap-2">
              <BadgeStatus status="away" />
              <span className="text-sm">away</span>
            </span>
            <span className="flex items-center gap-2">
              <BadgeStatus status="busy" />
              <span className="text-sm">busy</span>
            </span>
            <span className="flex items-center gap-2">
              <BadgeStatus status="invisible" />
              <span className="text-sm">invisible</span>
            </span>
            <span className="flex items-center gap-2">
              <BadgeStatus status="unread" />
              <span className="text-sm">unread</span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">In card context</p>
          <Card className="max-w-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">User card</CardTitle>
                <Badge variant="secondary">New</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Badges work well inside cards and tables for status.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Snippet</p>
          <CodeBlock
            code={`<Badge variant="secondary">Label</Badge>
<Badge variant="destructive" className="rounded-full">Pill</Badge>
<Badge className="gap-1"><CheckIcon /> With icon</Badge>`}
            language="tsx"
          />
        </div>
      </div>
    </section>
  );
}
