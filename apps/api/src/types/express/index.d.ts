export type User = {
  userName: string;
  userEmail: string;
  roleId: number;
  isVerified: boolean;
  id: number;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
