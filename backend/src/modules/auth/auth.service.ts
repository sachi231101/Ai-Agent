import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from './auth.repository';
import { authConfig } from '@config/auth.config';
import { ConflictError, UnauthorizedError } from '@common/errors/app.error';
import { RegisterDto, LoginDto, AuthUser } from './auth.types';
import { Tokens, JwtPayload } from '@common/types/auth.types';

export class AuthService {
  async register(dto: RegisterDto): Promise<{ user: AuthUser; tokens: Tokens }> {
    const existing = await authRepository.findByEmail(dto.email);
    if (existing) throw new ConflictError('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, authConfig.bcrypt.saltRounds);
    const user = await authRepository.create({ ...dto, password: hashedPassword });

    const tokens = this.generateTokens(user);
    await authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return { user: this.sanitize(user), tokens };
  }

  async login(dto: LoginDto): Promise<{ user: AuthUser; tokens: Tokens }> {
    const user = await authRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedError('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedError('Invalid credentials');

    const tokens = this.generateTokens(user);
    await authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return { user: this.sanitize(user), tokens };
  }

  async refresh(token: string): Promise<Tokens> {
    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, authConfig.jwt.refreshSecret) as JwtPayload;
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await authRepository.findById(payload.userId);
    if (!user || user.refreshToken !== token) {
      throw new UnauthorizedError('Refresh token revoked');
    }

    const tokens = this.generateTokens(user);
    await authRepository.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await authRepository.updateRefreshToken(userId, null);
  }

  private generateTokens(user: { id: string; email: string; role: string; organizationId?: string | null }): Tokens {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId ?? undefined,
    };

    const accessToken = jwt.sign(payload, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn as jwt.SignOptions['expiresIn'],
    });

    const refreshToken = jwt.sign(payload, authConfig.jwt.refreshSecret, {
      expiresIn: authConfig.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'],
    });

    return { accessToken, refreshToken };
  }

  private sanitize(user: { id: string; email: string; name: string; role: string; organizationId?: string | null }): AuthUser {
    return { id: user.id, email: user.email, name: user.name, role: user.role, organizationId: user.organizationId ?? undefined };
  }
}

export const authService = new AuthService();
