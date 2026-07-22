export const APP_NAME = 'Vibe Agent';
export const API_VERSION = 'v1';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  AUTH_SUCCESS: '/auth-success',
  DASHBOARD: '/dashboard',
  AGENTS: '/agents',
  AGENTS_NEW: '/agents/new',
  AGENT_DETAIL: '/agents/:id',
  WORKFLOWS: '/workflows',
  BLUEPRINT: '/blueprint',
  STUDIO: '/studio',
  TEMPLATES: '/templates',
  MARKETPLACE: '/marketplace',
  INTEGRATIONS: '/integrations',
  KNOWLEDGE: '/knowledge',
  ANALYTICS: '/analytics',
  NOTIFICATIONS: '/notifications',
  BILLING: '/billing',
  SETTINGS: '/settings',
  DOCUMENTATION: '/documentation',
  PROFILE: '/profile',
} as const;

export const QUERY_KEYS = {
  AUTH_ME: ['auth', 'me'],
  AGENTS: ['agents'],
  AGENT: (id: string) => ['agents', id],
  WORKFLOWS: ['workflows'],
  TEMPLATES: ['templates'],
  MARKETPLACE: ['marketplace'],
  INTEGRATIONS: ['integrations'],
  KNOWLEDGE: ['knowledge'],
  ANALYTICS: ['analytics'],
  NOTIFICATIONS: ['notifications'],
  BILLING: ['billing'],
} as const;
