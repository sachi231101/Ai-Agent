export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export const PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: ['*'],
  ADMIN: ['agents:*', 'workflows:*', 'users:read', 'users:write', 'billing:read', 'settings:*'],
  MEMBER: ['agents:read', 'agents:write', 'workflows:read', 'workflows:write'],
  VIEWER: ['agents:read', 'workflows:read'],
};

export const can = (role: UserRole, permission: string): boolean => {
  const perms = PERMISSIONS[role];
  return perms.includes('*') || perms.includes(permission) ||
    perms.some((p) => p.endsWith(':*') && permission.startsWith(p.replace(':*', ':')));
};
