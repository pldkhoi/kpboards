import { jwtDecode } from 'jwt-decode';
import { createContext, type ReactNode, useCallback, useEffect, useReducer, useRef } from 'react';
// @types
import {
  type ActionMap,
  type AuthState,
  type AuthUserType,
  type JWTContextType,
} from '@/types/auth';
// hooks-query
import { useLogout, useRefreshtoken } from '@/hooks/use-query-auth';
import { useQueryClient } from '@tanstack/react-query';
// utils
import { setSession } from '@/utils/jwt';
// utils
import { AUTH_STORAGE_KEY } from '@/utils/storage-keys';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

const noop = () => undefined;

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.Login]: {
    user: AuthUserType;
  };
  [Types.Logout]: undefined;
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case Types.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case Types.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case Types.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const queryClient = useQueryClient();
  const { mutate: refreshTokenMutate } = useRefreshtoken();
  const logoutMutate = useLogout();
  const handleRefreshTokenRef = useRef<VoidFunction>(noop);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimeoutRef.current !== null) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  }, []);

  const scheduleRefresh = useCallback(
    (exp: number) => {
      clearRefreshTimer();
      const currentTime = Date.now();
      const timeLeft = exp * 1000 - currentTime - 10000;
      const safeDelay = Math.min(Math.max(timeLeft, 0), 2147483647);

      refreshTimeoutRef.current = setTimeout(() => {
        handleRefreshTokenRef.current();
      }, safeDelay);
    },
    [clearRefreshTimer]
  );

  const handleRefreshToken = useCallback(() => {
    let refreshToken: string | undefined;

    try {
      const stored = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}') as {
        refreshToken?: string;
      };
      refreshToken = stored.refreshToken;
    } catch {
      refreshToken = undefined;
    }

    if (!refreshToken) {
      clearRefreshTimer();
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      setSession(null);
      return;
    }

    refreshTokenMutate(
      { refreshToken: refreshToken },
      {
        onSuccess: (userData) => {
          if (userData?.token) {
            setSession(userData);
            const { roles, username, exp } = jwtDecode<{
              roles?: string[];
              username?: string;
              exp: number;
            }>(userData.token || '');
            const normalizedUser: AuthUserType = {
              ...userData,
              roles: roles ?? userData.roles,
              username: username ?? userData.username,
            };

            dispatch({
              type: Types.Initial,
              payload: {
                isAuthenticated: true,
                user: normalizedUser,
              },
            });
            scheduleRefresh(exp);
            return;
          }

          clearRefreshTimer();
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          setSession(null);
        },
        onError: () => {
          clearRefreshTimer();
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          setSession(null);
        },
      }
    );
  }, [clearRefreshTimer, refreshTokenMutate, scheduleRefresh]);

  useEffect(() => {
    handleRefreshTokenRef.current = handleRefreshToken;
  }, [handleRefreshToken]);

  useEffect(() => {
    let refreshToken: string | undefined;
    try {
      refreshToken = (
        JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}') as { refreshToken?: string }
      ).refreshToken;
    } catch {
      refreshToken = undefined;
    }

    if (refreshToken) {
      handleRefreshToken();
    } else {
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      clearRefreshTimer();
      setSession(null);
    }
  }, [clearRefreshTimer, handleRefreshToken]);

  useEffect(
    () => () => {
      clearRefreshTimer();
    },
    [clearRefreshTimer]
  );

  const login = useCallback(
    (userData: AuthUserType) => {
      dispatch({
        type: Types.Login,
        payload: {
          user: userData,
        },
      });
      if (userData?.token) {
        const { exp } = jwtDecode<{
          exp: number;
        }>(userData.token || '');
        scheduleRefresh(exp);
      } else {
        clearRefreshTimer();
      }
    },
    [clearRefreshTimer, scheduleRefresh]
  );

  const logout = useCallback(
    (refreshToken: string) => {
      clearRefreshTimer();
      logoutMutate.mutate({ refreshToken });
      setSession(null);
      dispatch({ type: Types.Logout });
      queryClient.clear();
    },
    [clearRefreshTimer, queryClient, logoutMutate]
  );

  return <AuthContext value={{ ...state, method: 'jwt', login, logout }}>{children}</AuthContext>;
}

export { AuthContext, AuthProvider };
