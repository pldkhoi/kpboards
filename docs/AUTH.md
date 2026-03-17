# Authentication Guide

## Overview

Authentication uses **JWT (JSON Web Tokens)** with automatic token refresh. The auth state is managed via React Context with `useReducer`.

## Architecture

```
AuthProvider (Context)
├── Login → stores tokens, sets session
├── Logout → clears tokens, clears query cache
├── Token refresh → auto-refreshes before expiry
└── Initialization → checks stored tokens on mount
```

## Auth Context (`contexts/jwt-context.tsx`)

Provides:

| Property | Type | Description |
|---|---|---|
| `isAuthenticated` | `boolean` | Whether user is logged in |
| `isInitialized` | `boolean` | Whether auth state has been loaded |
| `user` | `AuthUserType \| null` | Current user data |
| `login(userData)` | `function` | Set auth state after login |
| `logout(refreshToken)` | `function` | Clear auth state |
| `method` | `'jwt'` | Auth method identifier |

## Using Auth

```typescript
import useAuth from 'hooks/use-auth';

function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <p className="text-lg">Welcome, {user?.username}</p>;
}
```

## Route Guards

### AuthGuard — Protected Routes

Wrap routes that require authentication:

```tsx
<AuthGuard>
  <DashboardLayout />
</AuthGuard>
```

Redirects to `/login` if not authenticated. Shows loading while auth initializes.

### GuestGuard — Public-Only Routes

Wrap routes that should only be visible to unauthenticated users (login, register):

```tsx
<GuestGuard>
  <LoginPage />
</GuestGuard>
```

Redirects to dashboard if already authenticated.

### RoleBasedGuard — Role Checks

Restrict access based on user roles:

```tsx
<RoleBasedGuard accessibleRoles={['admin', 'manager']}>
  <AdminPanel />
</RoleBasedGuard>
```

Shows "Permission Denied" message if user lacks required role.

## Token Management

Tokens are stored in `localStorage` under the key defined by `VITE_LOCAL_TOKEN` env var.

### Token Refresh

The auth provider automatically refreshes tokens 10 seconds before expiry using `setTimeout`. On refresh success, the timer resets for the new token's expiry.

### Session Utilities (`utils/jwt.ts`)

```typescript
import { isValidToken, setSession } from 'utils/jwt';

isValidToken(accessToken);  // Check if token is valid and not expired
setSession(userData);        // Store tokens in localStorage
```

## API Authentication

The Axios instance (`utils/axios.ts`) automatically attaches the Bearer token to all requests via a request interceptor. On 401 responses, it clears the session and redirects to login.

## Implementing Login

```typescript
import { useLogin } from 'hooks/use-query-auth';
import useAuth from 'hooks/use-auth';

function LoginPage() {
  const { login } = useAuth();
  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    const userData = await loginMutation.mutateAsync(data);
    login(userData);
  };
}
```
