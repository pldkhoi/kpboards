import CodeBlock from '@/components/admin-layout/code-block';
import NoDataFound from '@/components/no-data-found';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function CardSection({ className }: Props) {
  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <h2 id="cards" className="text-xl font-semibold tracking-tight">
            Cards
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Stat cards, content cards, cards with forms and actions. Loading skeleton and empty
            state.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Stat cards</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-2xl">1,284</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Revenue</CardDescription>
                <CardTitle className="text-2xl">$48,920</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Uptime</CardDescription>
                <CardTitle className="text-2xl">98.3%</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Loading skeleton</p>
          <Card className="max-w-xs">
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-8 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Empty state</p>
          <Card className="max-w-md">
            <CardContent className="pt-6">
              <NoDataFound title="No items yet" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Card with form</p>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Quick feedback</CardTitle>
              <CardDescription>Send us your thoughts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-email">Email</Label>
                  <Input id="card-email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-message">Message</Label>
                  <Input id="card-message" placeholder="Your feedback..." />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button size="sm">Submit</Button>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Card with actions</p>
          <Card>
            <CardHeader>
              <CardTitle>Card with Rich Content</CardTitle>
              <CardDescription>Lists, buttons, and more.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-4 list-inside list-disc space-y-1 text-sm">
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
              <div className="flex gap-2">
                <Button size="sm">Action</Button>
                <Button variant="outline" size="sm">
                  Secondary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Snippet</p>
          <CodeBlock
            code={`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter><Button>Action</Button></CardFooter>
</Card>`}
            language="tsx"
          />
        </div>
      </div>
    </section>
  );
}
