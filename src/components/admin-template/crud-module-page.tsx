import PageHeader from '@/components/page-header';
import { DataTable, createActionsColumn } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { AdminCrudBaseEntity, AdminResourceKey } from '@/types/admin-crud';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  status: z.enum(['active', 'inactive', 'draft', 'archived']),
  notes: z.string().optional(),
});

export type CrudFormValues = z.infer<typeof formSchema>;

type Props<TData extends AdminCrudBaseEntity> = {
  resource: AdminResourceKey;
  title: string;
  description: string;
  tableTitle: string;
  tableDescription: string;
  sampleData: TData[];
  detailSummary: string;
  columns: ColumnDef<TData>[];
};

function defaultColumns<TData extends AdminCrudBaseEntity>(): ColumnDef<TData>[] {
  return [
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.updatedAt}</span>
      ),
    },
  ];
}

export default function CrudModulePage<TData extends AdminCrudBaseEntity>({
  resource,
  title,
  description,
  tableTitle,
  tableDescription,
  sampleData,
  detailSummary,
  columns,
}: Props<TData>) {
  const { toast } = useToast();
  const methods = useForm<CrudFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', status: 'active', notes: '' },
  });

  const handleSubmit = methods.handleSubmit((values) => {
    toast({
      title: 'Template form submitted',
      description: `Validated payload for ${resource}: ${JSON.stringify(values)}`,
    });
  });

  const actionsColumn = createActionsColumn<TData>({
    getRowId: (row) => row.id,
    items: [
      { label: 'View details', onClick: (row) => toast({ title: `${title}: ${row.name}` }) },
      { label: 'Edit', onClick: (row) => toast({ title: `Edit ${row.name}` }) },
      {
        label: 'Delete',
        variant: 'destructive',
        onClick: (row) => toast({ title: `Delete ${row.name}`, variant: 'destructive' }),
      },
    ],
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Create {title.slice(0, -1)}
          </Button>
        }
      />

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList variant="default">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="form">Create / Edit</TabsTrigger>
          <TabsTrigger value="detail">Detail</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>{tableTitle}</CardTitle>
              <CardDescription>{tableDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[...(columns.length ? columns : defaultColumns<TData>()), actionsColumn]}
                data={sampleData}
                enableSearch
                enableSorting
                enablePagination
                enableRowSelection
                rowsPerPage={5}
                searchColumn="name"
                searchPlaceholder={`Search ${title.toLowerCase()}...`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Form Example (RHF + Zod)</CardTitle>
              <CardDescription>
                This form is a reusable template. Connect submit handlers to your service mutations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...methods}>
                <form className="grid gap-4 md:max-w-lg" onSubmit={handleSubmit}>
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...methods.register('name')} />
                    {methods.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {methods.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      {...methods.register('status')}
                      className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                      <option value="draft">draft</option>
                      <option value="archived">archived</option>
                    </select>
                    {methods.formState.errors.status && (
                      <p className="text-sm text-destructive">
                        {methods.formState.errors.status.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" {...methods.register('notes')} />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Validate</Button>
                    <Button type="button" variant="outline" onClick={() => methods.reset()}>
                      Reset
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          <Card>
            <CardHeader>
              <CardTitle>Detail / Preview Pattern</CardTitle>
              <CardDescription>
                Use this area to render readonly details loaded from `useAdminCrudDetail`.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{detailSummary}</p>
              {sampleData[0] && (
                <div className="mt-4 grid gap-2 rounded-md border p-4 text-sm">
                  <div>
                    <strong>ID:</strong> {sampleData[0].id}
                  </div>
                  <div>
                    <strong>Name:</strong> {sampleData[0].name}
                  </div>
                  <div>
                    <strong>Status:</strong> {sampleData[0].status}
                  </div>
                  <div>
                    <strong>Updated:</strong> {sampleData[0].updatedAt}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
