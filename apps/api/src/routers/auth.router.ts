import { AuthController } from '@/controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private path: string;
  private Auth: AuthController;
  private Guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.path = '/auth';
    this.Auth = new AuthController();
    this.Guard = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //register
    this.router.post('/register', this.Auth.registerController);
    //login
    this.router.post('/login', this.Auth.loginController);
    //verify-user
    this.router.post(
      '/verify',
      this.Guard.verifyToken,
      this.Auth.verifyController,
    );
    //refresh-token
    this.router.post(
      '/refresh',
      this.Guard.verifyToken,
      this.Auth.refreshTokenController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
