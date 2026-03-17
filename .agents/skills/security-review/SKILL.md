---
name: security-review
description: Security checklists and patterns for React, APIs, and Authentication. Use this when writing components that handle user input, data fetching, or authentication to ensure secure code.
---

# Security Review & Patterns

When writing or reviewing code in this React + Vite + shadcn/Tailwind application, strictly adhere to the following security guidelines.

## 1. Cross-Site Scripting (XSS) Prevention
- **Never use `dangerouslySetInnerHTML`** unless rendering pre-sanitized markdown/HTML from the server, and even then, pass it through `DOMPurify`.
- React automatically escapes strings rendered in `{}`. Rely on this native behavior.
- Be cautious with URLs provided by users (e.g., `<a href={userUrl}>`). Ensure they are validated and sanitized (block `javascript:` protocols).

## 2. Input Validation (Forms & API calls)
- **Always use Zod** for robust schema validation on the client before submitting to the API.
- Validate types, lengths, and formats. Do not rely entirely on the backend to catch simple validation errors.
- Never trust query parameters natively; parse them via Zod when reading from React Router to ensure type safety.

## 3. Authentication & Authorization
- Use the `AuthContext` to conditionally render UI elements based on roles.
- Use route `<AuthGuard>` and `<RoleGuard>` components to block unauthenticated or unauthorized access to pages. 
- *Note:* The project relies on Bearer tokens stored in `localStorage` under the key `accessToken`. The Axios interceptor (`src/utils/axios.ts`) handles attaching the token and redirecting to `/login` on 401 Unauthorized responses. Do not implement custom token-handling logic inside standard components; rely on the Axios interceptor.

## 4. Environment Variables & Secrets
- Never hardcode API keys, tokens, or secrets in the source code.
- Variables prefixed with `VITE_` are injected into the client bundle. **NEVER** place sensitive secrets (like database passwords or master API keys) in `.env` variables starting with `VITE_`.
- Only use `VITE_` for non-sensitive public configuration (e.g., `VITE_API_URL`).

## 5. Dependency Security
- If adding new packages, explicitly check if they are maintained and have no severe vulnerabilities.
- For deep object cloning or merging, avoid custom recursive functions that could lead to Prototype Pollution; use trusted utilities from lodash or native `structuredClone`.
