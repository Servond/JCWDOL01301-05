import { API_KEY } from '@/config';
import { HttpException } from '@/exceptions/http.exception';
import { IAuth } from '@/interfaces/auth.interface';
import { AuthQuery } from '@/queries/auth.query';
import { UserQuery } from '@/queries/user.query';
import { generateJWT } from '@/utils/auth.utils';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Container, Service } from 'typedi';

@Service()
export class AuthService {
  user = Container.get(UserQuery);
  auth = Container.get(AuthQuery);

  public registerService = async (data: IAuth): Promise<IAuth> => {
    try {
      // 1. check is email unique
      // let userQuery = new UserQuery();
      const isExist = await this.user.getUserByEmailQuery(data.userEmail);

      if (isExist) throw new Error('Email already exist!');

      //2. generate unique referral code
      const refCode = data.userName + Math.random().toString(36).slice(2);

      //3. encrypt password
      const salt = await genSalt(10);
      const hashPass = await hash(data.userPassword, salt);

      //4. regist user
      const user = this.auth.registerQuery(
        data,
        refCode,
        hashPass,
        Number(data?.userRoleId),
      );

      return user;
    } catch (error) {
      throw error;
    }
  };

  public loginService = async (data: IAuth) => {
    try {
      const user = await this.user.getUserByEmailQuery(data.userEmail);
      if (!user)
        throw new HttpException(500, "User with those email doesn't exist");

      const isValid = await compare(data.userPassword, user.userPassword);
      if (!isValid) throw new HttpException(500, 'Email or Password invalid');

      const payload = {
        id: user.id,
        userEmail: user.userEmail,
        userName: user.userName,
        isVerified: user.isVerified,
        roleId: user.role.id,
      };

      const token = generateJWT(payload, '1h'); //token jwt
      return { user, token };
    } catch (error) {
      throw error;
    }
  };

  public verifyService = async (email: string) => {
    try {
      // 1. re-check user email via query
      const user = await this.user.getUserByEmailQuery(email);
      if (!user) throw new HttpException(500, 'Something went wrong');

      // 2. update isVerified field at DB into True
      await this.auth.verifyUserQuery(email);
    } catch (error) {
      throw error;
    }
  };

  public refreshTokenService = async (email: string) => {
    try {
      const user = await this.user.getUserByEmailQuery(email);

      if (!user) throw new HttpException(500, 'Something went wrong');

      const payload = {
        id: user.id,
        userEmail: user.userEmail,
        userName: user.userName,
        isVerified: user.isVerified,
        roleId: user.role.id,
      };

      const token = generateJWT(payload, '1h'); //token jwt

      return token;
    } catch (error) {
      throw error;
    }
  };
}
