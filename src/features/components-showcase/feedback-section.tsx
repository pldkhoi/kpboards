import CodeBlock from '@/components/admin-layout/code-block';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { Loader2Icon } from 'lucide-react';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function FeedbackSection({ className }: Props) {
  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <h2 id="feedback" className="text-xl font-semibold tracking-tight">
            Feedback
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Alerts, progress, skeleton, spinner. Toast example and inline loading states.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Alerts</p>
          <div className="space-y-2">
            <Alert variant="default">This is an info alert.</Alert>
            <Alert variant="success">This is a success alert.</Alert>
            <Alert variant="warning">This is a warning alert.</Alert>
            <Alert variant="destructive">This is a destructive alert.</Alert>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Progress</p>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground">35%</span>
              <Progress value={35} className="mt-1" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">68%</span>
              <Progress value={68} className="mt-1" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">91%</span>
              <Progress value={91} className="mt-1" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Skeleton</p>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Spinner / Inline loading</p>
          <div className="flex items-center gap-4">
            <Loader2Icon className="size-8 animate-spin text-primary" aria-hidden />
            <Button disabled>
              <Loader2Icon className="mr-2 size-4 animate-spin" aria-hidden />
              Submitting...
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Toast</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success('Saved successfully')}>
              Success toast
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.error('Something went wrong')}>
              Error toast
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Snippet</p>
          <CodeBlock
            code={`<Alert variant="destructive">Error message</Alert>
<Progress value={60} />
<Skeleton className="h-4 w-full" />
toast.success('Done')`}
            language="tsx"
          />
        </div>
      </div>
    </section>
  );
}
