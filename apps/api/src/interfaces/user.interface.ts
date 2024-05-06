export interface IUser {
  id: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  isVerified: boolean;
  role: {
    id: number;
  };
}
