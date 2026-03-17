# API Layer Guide

## Overview

The project uses **Axios** for HTTP with interceptors for auth tokens and error handling. **TanStack Query** handles server state (caching, loading, mutations).

## Axios Setup

- **Base URL**: `HOST_API` from config (from `VITE_API_ENDPOINT`)
- **Auth**: Bearer token from localStorage (key from `VITE_LOCAL_TOKEN`) attached to requests
- **401**: Clears auth storage and redirects to `/login`

## Using the API Client

```typescript
import { sendGet, sendPost, normalizeApiError } from 'services/api-client';

// GET
const users = await sendGet<User[]>('/api/users');

// POST
const created = await sendPost<User>('/api/users', { name: 'John' });
```

## Error Handling

Use `normalizeApiError` when catching errors:

```typescript
import { sendGet, normalizeApiError } from 'services/api-client';

try {
  const data = await sendGet('/api/items');
  return data;
} catch (err) {
  const apiError = normalizeApiError(err);
  // apiError: { status?, message, code?, data? }
  toast.error(apiError.message);
  throw apiError;
}
```

## TanStack Query

Example mutation:

```typescript
import { useMutation } from '@tanstack/react-query';
import { loginService } from 'services/auth';

export const useLogin = () =>
  useMutation({
    mutationFn: loginService,
    onError: (err) => {
      const apiError = normalizeApiError(err);
      toast.error(apiError.message);
    },
  });
```

## Mocking in Tests

```typescript
import { vi } from 'vitest';

vi.mock('utils/axios', () => ({
  sendGet: vi.fn().mockResolvedValue({ id: 1, name: 'Test' }),
  sendPost: vi.fn().mockRejectedValue(new Error('Network error')),
}));
```
