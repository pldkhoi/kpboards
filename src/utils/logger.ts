/**
 * Logger utility that no-ops or forwards to external service in production.
 * Use instead of console.* for error reporting and diagnostics.
 */

const isDev = import.meta.env.DEV;

export const log = {
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
    // TODO: Send to error reporting service (Sentry, etc.) in production
  },
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
};
