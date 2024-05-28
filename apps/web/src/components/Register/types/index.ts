export interface FormValues {
  userEmail: string;
  userPassword: string;
  roleId: number;
  userName: string;
}

export interface FormProps {
  initialUserEmail?: string;
  initialUserPassword?: string;
  initialRoleId?: number;
  initialUserName?: string;
}
