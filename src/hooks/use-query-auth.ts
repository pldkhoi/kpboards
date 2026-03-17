import { useMutation } from '@tanstack/react-query';
// _types
import { type AuthUserType } from '@/types/auth';
import {
  type ChangePasswordParamType,
  type ForgetPasswordParamType,
  type LoginParamType,
  type RefeshTokenParamType,
  type RegisterParamType,
  type VerifyEmailParamType,
  type VerifyOtpParamType,
} from '@/types/request-param/request-param-auth';
import { type ReponseSuccessType, type ResponseErrorType } from '@/types/response/response';
import { type AxiosError } from 'axios';
// services
import {
  changePasswordService,
  checkResetTokenService,
  forgetPasswordService,
  loginService,
  logoutService,
  refreshtokenService,
  registerService,
  resetPasswordService,
  verifyEmailService,
  verifyOtpService,
} from '@/services/auth';

// ----------------------------------------------------------------------

export const useLogout = () =>
  useMutation({
    mutationFn: logoutService,
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: resetPasswordService,
  });

export const useRefreshtoken = () =>
  useMutation<AuthUserType, Error, RefeshTokenParamType>({
    mutationFn: refreshtokenService,
  });

export const useLogin = () =>
  useMutation<AuthUserType, Error, LoginParamType>({
    mutationFn: loginService,
  });

export const useRegister = () =>
  useMutation<ReponseSuccessType<string>, Error, RegisterParamType>({
    mutationFn: registerService,
  });

export const useForgetPassword = () =>
  useMutation<ReponseSuccessType<string>, Error, ForgetPasswordParamType>({
    mutationFn: forgetPasswordService,
  });

export const useCheckResetToken = () =>
  useMutation({
    mutationFn: checkResetTokenService,
  });

export const useChangePassword = () =>
  useMutation<ReponseSuccessType<string>, AxiosError<ResponseErrorType>, ChangePasswordParamType>({
    mutationFn: changePasswordService,
  });

export const useVerifyEmail = () =>
  useMutation<ReponseSuccessType<string>, Error, VerifyEmailParamType>({
    mutationFn: verifyEmailService,
  });

export const useVerifyOtp = () =>
  useMutation<ReponseSuccessType<string>, Error, VerifyOtpParamType>({
    mutationFn: verifyOtpService,
  });
