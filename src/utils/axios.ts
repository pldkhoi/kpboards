import { HOST_API } from '@/config';
import { PATH_PAGE } from '@/routes/paths';
import type { ApiError } from '@/types/api-error';
import { AUTH_STORAGE_KEY } from '@/utils/storage-keys';
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

function getAccessToken(): string | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as { accessToken?: string };
    return parsed.accessToken ?? null;
  } catch {
    return null;
  }
}

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error instanceof Error ? error : new Error('Request failed'))
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.location.href = PATH_PAGE.login;
    }

    return Promise.reject(error);
  }
);

export const sendGet = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  axiosInstance.get<T>(url, config).then((res) => res.data);

export const sendPost = <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> =>
  axiosInstance.post<T>(url, data, config).then((res) => res.data);

export const sendPut = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
  axiosInstance.put<T>(url, data, config).then((res) => res.data);

export const sendPatch = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => axiosInstance.patch<T>(url, data, config).then((res) => res.data);

export const sendDelete = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  axiosInstance.delete<T>(url, config).then((res) => res.data);

/** Type guard for successful API response shape */
export function isSuccessResponse<T>(
  res: unknown
): res is { data?: T; code?: number; message?: string } {
  return res !== null && typeof res === 'object' && 'data' in res;
}

/** Normalize AxiosError to ApiError for consistent handling */
export function normalizeApiError(error: unknown): ApiError {
  const axiosErr = error as AxiosError<{ message?: string; code?: string }>;
  const status = axiosErr.response?.status;
  const data = axiosErr.response?.data;
  const messageFromResponse =
    data && typeof data === 'object' && 'message' in data ? String(data.message) : undefined;

  return {
    status,
    message: messageFromResponse ?? axiosErr.message ?? 'An error occurred',
    code: data?.code,
    data,
  };
}

export default axiosInstance;
