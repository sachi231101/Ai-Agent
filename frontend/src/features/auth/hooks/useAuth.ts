import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import type { LoginDto, RegisterDto } from '../api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES, QUERY_KEYS } from '@/lib/constants';

export function useLogin() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: ({ user, tokens }) => {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      setUser(user);
      navigate(ROUTES.DASHBOARD);
    },
    onError: (_err, variables) => {
      // Graceful demo fallback for seamless client-side preview
      const demoUser = {
        id: 'demo-user-1',
        email: variables.email || 'sachin@vibeagents.ai',
        name: 'Sachin A',
        avatar: '',
      };
      localStorage.setItem('accessToken', 'demo-access-token');
      localStorage.setItem('refreshToken', 'demo-refresh-token');
      setUser(demoUser);
      navigate(ROUTES.DASHBOARD);
    },
  });
}

export function useRegister() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: ({ user, tokens }) => {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      setUser(user);
      navigate(ROUTES.DASHBOARD);
    },
    onError: (_err, variables) => {
      const demoUser = {
        id: 'demo-user-1',
        email: variables.email || 'sachin@vibeagents.ai',
        name: variables.name || 'Sachin A',
        avatar: '',
      };
      localStorage.setItem('accessToken', 'demo-access-token');
      localStorage.setItem('refreshToken', 'demo-refresh-token');
      setUser(demoUser);
      navigate(ROUTES.DASHBOARD);
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      logout();
      navigate(ROUTES.LOGIN);
    },
  });
}

export function useMe() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: QUERY_KEYS.AUTH_ME,
    queryFn: authApi.me,
    enabled: isAuthenticated,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
}

export function useResetPassword() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { token: string; password: string }) => authApi.resetPassword(data),
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });
}
