import { z } from 'zod';

const envSchema = z.object({
  VITE_API_ENDPOINT: z.string().optional().default(''),
  VITE_AUTH_API_ENDPOINT: z.string().optional().default(''),
  VITE_LOCAL_TOKEN: z.string().optional().default('app_token'),
  VITE_AUTH_MOCK_MODE: z
    .enum(['true', 'false'])
    .optional()
    .default('false')
    .transform((value) => value === 'true'),
  VITE_X_APP_ID: z.string().optional().default(''),
  VITE_RELEASE_VERSION: z.string().optional().default('1.0.0'),
  VITE_X_LOCAL_TIMEZONE_ID: z.string().optional().default('X-LOCAL-TIMEZONE-ID'),
});

const parsed = envSchema.safeParse({
  VITE_API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
  VITE_AUTH_API_ENDPOINT: import.meta.env.VITE_AUTH_API_ENDPOINT,
  VITE_LOCAL_TOKEN: import.meta.env.VITE_LOCAL_TOKEN,
  VITE_AUTH_MOCK_MODE: import.meta.env.VITE_AUTH_MOCK_MODE,
  VITE_X_APP_ID: import.meta.env.VITE_X_APP_ID,
  VITE_RELEASE_VERSION: import.meta.env.VITE_RELEASE_VERSION,
  VITE_X_LOCAL_TIMEZONE_ID: import.meta.env.VITE_X_LOCAL_TIMEZONE_ID,
});

if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${JSON.stringify(parsed.error.issues)}`);
}

export const env = parsed.data;
