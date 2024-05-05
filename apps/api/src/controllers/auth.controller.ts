import e, { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { Container } from 'typedi';

export class AuthController {
  auth = Container.get(AuthService);

  public registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.auth.registerService(req.body);
      res.status(201).send({
        message: 'Register success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.auth.loginService(req.body);

      res.status(200).json({
        message: 'Login success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public verifyController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userEmail } = req.user;

      await this.auth.verifyService(userEmail);

      res.status(200).json({
        message: 'Verify user success',
      });
    } catch (error) {
      next(error);
    }
  };

  public refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userEmail } = req.user;

      const result = await this.auth.refreshTokenService(userEmail);

      res.status(200).json({
        message: 'New refresh token generated',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
