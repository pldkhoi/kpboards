import type { ReponseSuccessType } from '@/types/response/response';

export type AdminResourceKey = 'users' | 'roles' | 'products' | 'orders' | 'audit-logs';

export interface AdminCrudListQuery {
  pageIndex: number;
  pageSize: number;
  searchKey?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface AdminCrudBaseEntity {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type AdminCrudDetailResponse<T> = ReponseSuccessType<T>;
export type AdminCrudListResponse<T> = ReponseSuccessType<T[]>;

export interface AdminCrudServiceContract<TList, TCreate, TUpdate> {
  list: (params: AdminCrudListQuery) => Promise<AdminCrudListResponse<TList>>;
  detail: (id: string) => Promise<AdminCrudDetailResponse<TList>>;
  create: (payload: TCreate) => Promise<AdminCrudDetailResponse<TList>>;
  update: (id: string, payload: TUpdate) => Promise<AdminCrudDetailResponse<TList>>;
  remove: (id: string) => Promise<ReponseSuccessType<string>>;
}
