# Rich Text Editor (TipTap)

The project uses [TipTap](https://tiptap.dev/) for rich text editing.

## Basic usage

```tsx
import RichTextEditor from '@/components/editor/rich-text-editor';

function MyForm() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      content={content}
      placeholder="Write your content..."
      onChange={setContent}
    />
  );
}
```

## Props

| Prop       | Type                   | Default           | Description                    |
| ---------- | ---------------------- | ----------------- | ------------------------------ |
| content    | string                 | `''`              | Initial HTML content           |
| placeholder| string                 | `'Write something...'` | Placeholder text           |
| onChange   | (html: string) => void | —                 | Called when content changes    |
| editable   | boolean                | `true`            | Whether the editor is editable |
| className  | string                 | —                 | Additional CSS classes         |

## Extensions

The default setup includes StarterKit (bold, italic, lists, headings, etc.) and Placeholder. To add more extensions:

```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';

const editor = useEditor({
  extensions: [StarterKit, Placeholder.configure({ placeholder: '...' }), Link],
  content: '<p>Hello</p>',
});
```

See [TipTap extensions](https://tiptap.dev/docs/editor/extensions/overview) for more.
