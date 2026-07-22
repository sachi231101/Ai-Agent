import env from './env';

export const authConfig = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshSecret: env.JWT_REFRESH_SECRET,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  bcrypt: {
    saltRounds: 12,
  },
  cookie: {
    httpOnly: true,
    secure: env.isProd,
    sameSite: 'strict' as const,
  },
};
