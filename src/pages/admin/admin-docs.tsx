import CodeBlock from '@/components/admin-layout/code-block';
import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PencilIcon } from 'lucide-react';

// ----------------------------------------------------------------------

function DocSection({
  id,
  title,
  children,
  code,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle id={id} className="scroll-mt-6 text-xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Example</h4>
          {children}
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Usage</h4>
          <CodeBlock code={code} />
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export default function AdminDocsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="UI Library Documentation"
        description="Primary components from components/ui with examples and usage snippets. For full template docs, see the quick-start and library guides."
      />

      <Card>
        <CardHeader>
          <CardTitle>Template Guides</CardTitle>
          <CardDescription>
            Production-ready starter documentation for CRUD modules and installed library usage.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <code>docs/TEMPLATE_QUICKSTART.md</code>
          <code>docs/CRUD_RECIPE.md</code>
          <code>docs/LIBRARY_USAGE.md</code>
        </CardContent>
      </Card>

      <DocSection
        id="button"
        title="Button"
        code={`import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button variant="default" size="icon" aria-label="Edit">
  <PencilIcon className="size-4" />
</Button>`}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button variant="default" size="icon" aria-label="Edit">
            <PencilIcon className="size-4" />
          </Button>
        </div>
      </DocSection>

      <DocSection
        id="input"
        title="Input"
        code={`import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
<Input placeholder="Disabled" disabled />`}
      >
        <div className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-email">Email</Label>
            <Input id="demo-email" type="email" placeholder="you@example.com" />
          </div>
          <Input placeholder="Disabled" disabled />
        </div>
      </DocSection>

      <DocSection
        id="badge"
        title="Badge"
        code={`import { Badge } from '@/components/ui/badge';

<Badge variant="default">default</Badge>
<Badge variant="secondary">secondary</Badge>
<Badge variant="destructive">destructive</Badge>
<Badge variant="outline">outline</Badge>
<Badge variant="ghost">ghost</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="destructive">destructive</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="ghost">ghost</Badge>
        </div>
      </DocSection>

      <DocSection
        id="card"
        title="Card"
        code={`import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`}
      >
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Optional description for the card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card content area. Use CardHeader, CardTitle, CardDescription, and CardContent.
            </p>
          </CardContent>
        </Card>
      </DocSection>

      <DocSection
        id="tabs"
        title="Tabs"
        code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1.</TabsContent>
  <TabsContent value="tab2">Content for tab 2.</TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="overview" className="max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-muted-foreground">Overview content goes here.</p>
          </TabsContent>
          <TabsContent value="details">
            <p className="text-sm text-muted-foreground">Details content goes here.</p>
          </TabsContent>
        </Tabs>
      </DocSection>
    </div>
  );
}
