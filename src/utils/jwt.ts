import { jwtDecode } from 'jwt-decode';
// _types
import { type AuthUserType } from '@/types/auth';
// utils
import axios from '@/utils/axios';
// utils
import { AUTH_STORAGE_KEY } from '@/utils/storage-keys';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (authData: AuthUserType) => {
  if (authData?.token && authData.refreshToken) {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ accessToken: authData.token, refreshToken: authData.refreshToken })
    );

    axios.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
