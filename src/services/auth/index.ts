import * as endpoints from '@/services/auth/endpoints';
// _types
import {
  type ChangePasswordParamType,
  type ForgetPasswordParamType,
  type LoginParamType,
  type RefeshTokenParamType,
  type RegisterParamType,
  type ResetPasswordParamType,
  type ResetTokenParamType,
  type VerifyEmailParamType,
  type VerifyOtpParamType,
} from '@/types/request-param/request-param-auth';
// utils
import { sendPost } from '@/utils/axios';
// config
import { AUTH_API, X_APP_ID } from '@/config';
import { env } from '@/env';
import { type AuthUserType } from '@/types/auth';
import { type ReponseSuccessType } from '@/types/response/response';

const AUTH_SUCCESS_DELAY = 250;

function toBase64Url(value: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(value);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
  const base64 = window.btoa(binary);

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createMockJwt(
  username: string,
  roles: string[] = ['admin'],
  expiresInSeconds = 3600
): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: username,
    username,
    roles,
    role: roles[0],
    iat: now,
    exp: now + expiresInSeconds,
  };

  return `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(payload))}.mock-signature`;
}

function createMockAuthUser(username = 'demo.user'): AuthUserType {
  const normalized = username.trim() || 'demo.user';
  const token = createMockJwt(normalized, ['admin'], 3600);
  const refreshToken = createMockJwt(normalized, ['admin'], 60 * 60 * 24 * 7);
  const [firstName, lastName] = normalized.split('.');

  return {
    id: `mock-${normalized}`,
    username: normalized,
    firstName: firstName ?? 'Demo',
    lastName: lastName ?? 'User',
    role: 'admin',
    roles: ['admin'],
    token,
    refreshToken,
    type: 'Bearer',
  };
}

function mockResponse<T>(payload: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), AUTH_SUCCESS_DELAY);
  });
}

function isMockModeEnabled(): boolean {
  return import.meta.env.DEV || env.VITE_AUTH_MOCK_MODE;
}

// ----------------------------------------------------------------------

export const logoutService = (params: RefeshTokenParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: 'Mock logout successful',
        data: 'ok',
      })
    : sendPost<ReponseSuccessType<string>>(AUTH_API + endpoints.LOGOUT, params, {
        headers: { 'X-App-Id': X_APP_ID },
        params: { refreshToken: params.refreshToken },
      });

export const resetPasswordService = (params: ResetPasswordParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: 'Mock password reset successful',
        data: 'ok',
      })
    : sendPost(AUTH_API + endpoints.RESET_PASSWORD, params);

export const refreshtokenService = (params: RefeshTokenParamType) =>
  isMockModeEnabled()
    ? mockResponse<AuthUserType>(createMockAuthUser('demo.user'))
    : sendPost<AuthUserType>(AUTH_API + endpoints.REFRESH_TOKEN, params);

export const loginService = (params: LoginParamType) =>
  isMockModeEnabled()
    ? mockResponse<AuthUserType>(createMockAuthUser(params.username?.trim() || 'demo.user'))
    : sendPost<AuthUserType>(AUTH_API + endpoints.LOGIN, params);

export const registerService = (params: RegisterParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: `Mock account created for ${params.email ?? params.username ?? 'user'}`,
        data: 'ok',
      })
    : sendPost<ReponseSuccessType<string>>(AUTH_API + endpoints.REGISTER, params);

export const forgetPasswordService = (params: ForgetPasswordParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: `Mock reset email sent to ${params.email ?? 'user'}`,
        data: 'ok',
      })
    : sendPost(AUTH_API + endpoints.FORGET_PASSWORD, params);

export const checkResetTokenService = (params: ResetTokenParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: 'Mock reset token valid',
        data: params.resetToken ?? '',
      })
    : sendPost(AUTH_API + endpoints.CHECK_RESET_TOKEN, params);

export const changePasswordService = (params: ChangePasswordParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: 'Mock password changed',
        data: 'ok',
      })
    : sendPost<ReponseSuccessType<string>>(AUTH_API + endpoints.CHANGE_PASSWORD, params);

export const verifyEmailService = (params: VerifyEmailParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: 'Mock email verified successfully',
        data: params.token ?? '',
      })
    : sendPost<ReponseSuccessType<string>>(AUTH_API + endpoints.VERIFY_EMAIL, params);

export const verifyOtpService = (params: VerifyOtpParamType) =>
  isMockModeEnabled()
    ? mockResponse<ReponseSuccessType<string>>({
        code: 200,
        message: 'Mock OTP verified successfully',
        data: 'ok',
      })
    : sendPost<ReponseSuccessType<string>>(AUTH_API + endpoints.VERIFY_OTP, params);
