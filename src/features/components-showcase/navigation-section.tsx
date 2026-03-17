import CodeBlock from '@/components/admin-layout/code-block';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PATH_PAGE } from '@/routes/paths';
import { Link } from 'react-router';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function NavigationSection({ className }: Props) {
  return (
    <section className={className}>
      <div className="space-y-4">
        <div>
          <h2 id="navigation" className="text-xl font-semibold tracking-tight">
            Navigation
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Breadcrumb, Tabs, DropdownMenu. Use in layout headers and content areas.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Breadcrumb</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to={PATH_PAGE.home} />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to={PATH_PAGE.adminDashboard} />}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Components</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Tabs (in context)</p>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="rounded-lg border p-4">
              Overview content goes here.
            </TabsContent>
            <TabsContent value="analytics" className="rounded-lg border p-4">
              Analytics content goes here.
            </TabsContent>
            <TabsContent value="settings" className="rounded-lg border p-4">
              Settings content goes here.
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Dropdown Menu</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Snippet</p>
          <CodeBlock
            code={`<Breadcrumb>...</Breadcrumb>
<Tabs defaultValue="overview">
  <TabsList><TabsTrigger value="overview">Overview</TabsTrigger></TabsList>
  <TabsContent value="overview">Content</TabsContent>
</Tabs>`}
            language="tsx"
          />
        </div>
      </div>
    </section>
  );
}
