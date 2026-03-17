import { env } from '@/env';

/** LocalStorage key for the auth token object (JSON: { accessToken, refreshToken }) */
export const AUTH_STORAGE_KEY = env.VITE_LOCAL_TOKEN;
