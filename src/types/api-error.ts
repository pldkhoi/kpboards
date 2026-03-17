/** Normalized API error type for consistent error handling */
export interface ApiError {
  status?: number;
  message: string;
  code?: string;
  data?: unknown;
}
