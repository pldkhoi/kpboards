import CodeBlock from '@/components/admin-layout/code-block';
import ConfirmDialog from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Loader2Icon, PencilIcon, SettingsIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function ButtonSection({ className }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <h2 id="buttons" className="text-xl font-semibold tracking-tight">
            Buttons
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Primary actions, variants, sizes, and icon buttons. Use <code>asChild</code> with Link
            for navigation.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Variants</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
              Destructive
            </Button>
            <Button variant="link" asChild>
              <Link to="/">Link (asChild)</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Sizes</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Icon buttons</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="icon" aria-label="Edit">
              <PencilIcon className="size-4" aria-hidden />
            </Button>
            <Button variant="outline" size="icon" aria-label="Settings">
              <SettingsIcon className="size-4" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Delete">
              <Trash2Icon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">States</p>
          <div className="flex flex-wrap gap-2">
            <Button disabled>Disabled</Button>
            <Button disabled aria-busy>
              <Loader2Icon className="size-4 animate-spin" aria-hidden />
              Loading
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Snippet</p>
          <CodeBlock
            code={`<Button variant="default">Primary</Button>
<Button variant="destructive" onClick={onDelete}>Delete</Button>
<Button asChild><Link to="/">Navigate</Link></Button>`}
            language="tsx"
          />
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete item?"
        content="This action cannot be undone."
        action={
          <Button variant="destructive" onClick={() => setConfirmOpen(false)}>
            Delete
          </Button>
        }
      />
    </section>
  );
}
