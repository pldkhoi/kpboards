export type ActionMap<M extends Record<string, unknown>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = {
  firstName?: string;
  id?: string;
  lastName?: string;
  refreshToken?: string;
  token?: string;
  type?: string;
  roles?: string[];
  role?: string;
  username?: string;
} | null;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  method: string;
  login: (user: AuthUserType) => void;
  logout: (refreshToken: string) => void;
};
