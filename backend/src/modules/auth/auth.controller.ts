import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { HTTP_STATUS } from '@common/constants/http.constants';
import { authConfig } from '@config/auth.config';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      this.setTokenCookies(res, result.tokens);
      res.status(HTTP_STATUS.CREATED).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      this.setTokenCookies(res, result.tokens);
      res.status(HTTP_STATUS.OK).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.refreshToken || req.cookies?.refreshToken;
      const tokens = await authService.refresh(token);
      this.setTokenCookies(res, tokens);
      res.json({ success: true, data: tokens });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.user!.userId);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.json({ success: true, message: 'Logged out' });
    } catch (err) {
      next(err);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: req.user });
    } catch (err) {
      next(err);
    }
  }

  private setTokenCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
    res.cookie('accessToken', tokens.accessToken, { ...authConfig.cookie, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie('refreshToken', tokens.refreshToken, { ...authConfig.cookie, maxAge: 30 * 24 * 60 * 60 * 1000 });
  }
}

export const authController = new AuthController();
