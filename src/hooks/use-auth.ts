import { use } from 'react';
//
import { AuthContext } from '@/contexts/jwt-context';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = use(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export default useAuth;
