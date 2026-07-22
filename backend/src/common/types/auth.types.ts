export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  organizationId?: string;
  iat?: number;
  exp?: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
