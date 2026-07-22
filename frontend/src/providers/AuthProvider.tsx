import { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';

interface AuthContextValue {
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ isLoading: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const user = await authApi.me();
          setUser(user);
        }
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [setUser, setLoading]);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
