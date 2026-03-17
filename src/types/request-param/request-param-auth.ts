export type LoginParamType = {
  username?: string;
  password?: string;
};

export type RegisterParamType = {
  username?: string;
  email?: string;
  password?: string;
};

export type RefeshTokenParamType = {
  refreshToken?: string;
};

export type ForgetPasswordParamType = {
  email?: string;
};

export type ResetPasswordParamType = {
  newPassword?: string;
  resetToken?: string;
};

export type ResetTokenParamType = {
  resetToken?: string;
};

export type ChangePasswordParamType = {
  currentPassword?: string;
  newPassword?: string;
};

export type VerifyEmailParamType = {
  token?: string;
};

export type VerifyOtpParamType = {
  email?: string;
  code?: string;
};
