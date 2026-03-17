import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ColumnDef } from '@tanstack/react-table';
import DataTable from './data-table';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const sampleData: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Carol', email: 'carol@example.com' },
];

const meta = {
  title: 'Table/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable<User, unknown>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: Array.from({ length: 25 }, (_, i) => ({
      id: String(i + 1),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    })),
    enablePagination: true,
    rowsPerPage: 5,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
  },
};
