# Drag and Drop (dnd-kit)

The project uses [dnd-kit](https://dndkit.com/) for drag-and-drop. react-beautiful-dnd is deprecated; dnd-kit is the recommended replacement.

## SortableList

For sortable vertical lists:

```tsx
import SortableList from '@/components/sortable-list';

function MyList() {
  const [items, setItems] = useState([
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
  ]);

  return (
    <SortableList
      items={items}
      onReorder={setItems}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <span>{item.label}</span>}
    />
  );
}
```

## Props

| Prop         | Type                     | Description                        |
| ------------ | ------------------------ | ---------------------------------- |
| items        | T[]                      | Array of items to sort             |
| onReorder    | (items: T[]) => void     | Called when order changes          |
| keyExtractor | (item: T) => string      | Unique key for each item           |
| renderItem   | (item: T, index) => ReactNode | Renders each item             |
| className    | string                   | Additional CSS classes             |

## Custom drag and drop

For custom layouts (grids, kanban, etc.), use `@dnd-kit/core` and `@dnd-kit/sortable` directly. See [dnd-kit documentation](https://docs.dndkit.com/).
