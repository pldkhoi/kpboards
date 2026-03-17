import type { AdminCrudBaseEntity } from '@/types/admin-crud';

type Entity = AdminCrudBaseEntity & Record<string, string>;

const now = '2026-03-14';

export const SAMPLE_USERS: Entity[] = [
  {
    id: 'usr_001',
    name: 'Olivia Martin',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    role: 'Admin',
  },
  {
    id: 'usr_002',
    name: 'Jackson Lee',
    status: 'inactive',
    createdAt: now,
    updatedAt: now,
    role: 'Editor',
  },
  {
    id: 'usr_003',
    name: 'Isabella Nguyen',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    role: 'Viewer',
  },
];

export const SAMPLE_ROLES: Entity[] = [
  {
    id: 'rol_001',
    name: 'Admin',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    scope: 'All permissions',
  },
  {
    id: 'rol_002',
    name: 'Manager',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    scope: 'Team permissions',
  },
  {
    id: 'rol_003',
    name: 'Viewer',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    scope: 'Read only',
  },
];

export const SAMPLE_PRODUCTS: Entity[] = [
  {
    id: 'prd_001',
    name: 'Starter Plan',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    sku: 'STARTER',
  },
  { id: 'prd_002', name: 'Pro Plan', status: 'active', createdAt: now, updatedAt: now, sku: 'PRO' },
  {
    id: 'prd_003',
    name: 'Enterprise Plan',
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    sku: 'ENT',
  },
];

export const SAMPLE_ORDERS: Entity[] = [
  {
    id: 'ord_001',
    name: 'Order #1001',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    total: '$129.00',
  },
  {
    id: 'ord_002',
    name: 'Order #1002',
    status: 'archived',
    createdAt: now,
    updatedAt: now,
    total: '$59.00',
  },
  {
    id: 'ord_003',
    name: 'Order #1003',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    total: '$240.00',
  },
];

export const SAMPLE_AUDIT_LOGS: Entity[] = [
  {
    id: 'aud_001',
    name: 'User permission changed',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    actor: 'system.admin',
  },
  {
    id: 'aud_002',
    name: 'Order status updated',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    actor: 'ops.manager',
  },
  {
    id: 'aud_003',
    name: 'Product archived',
    status: 'active',
    createdAt: now,
    updatedAt: now,
    actor: 'catalog.editor',
  },
];
