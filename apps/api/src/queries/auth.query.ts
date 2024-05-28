import { IAuth } from '@/interfaces/auth.interface';
import { User } from '@prisma/client';
import { Service } from 'typedi';
import { generateJWT } from '@/utils/auth.utils';
import { FE_URL } from '@/config';
import * as handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { transporter } from '@/helpers/nodemailer';
import prisma from '@/prisma';

@Service()
export class AuthQuery {
  public registerQuery = async (
    data: IAuth,
    refCode: string,
    password: string,
    roleId: number,
  ): Promise<User> => {
    try {
      const { userEmail, userName } = data;
      const user = await prisma.user.create({
        data: {
          userEmail,
          userName,
          userPassword: password,
          userReferralCode: refCode,
          isVerified: false,
          roleId,
        },
      });

      //send confirmation email
      await this.sendConfirmationEmail(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

  public verifyUserQuery = async (email: string): Promise<void> => {
    try {
      await prisma.user.update({
        where: {
          userEmail: email,
        },
        data: {
          isVerified: true,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  private sendConfirmationEmail = async (user: any) => {
    try {
      const payload = {
        id: user.id,
        userEmail: user.userEmail,
        userName: user.userName,
        isVerified: user.isVerified,
        roleId: user.roleId,
      };

      const token = generateJWT(payload, '1hr');

      const templatePath = path.join(
        __dirname,
        '../templates',
        'registrationEmail.hbs',
      );

      const urlVerify = `${FE_URL}/verify?token=${token}`;
      const templateText = fs.readFileSync(templatePath, 'utf-8');

      const compiledTemplate = handlebars.compile(templateText);
      const html = compiledTemplate({
        email: user.userEmail,
        url: urlVerify,
        username: user.userName,
      });

      await transporter.sendMail({
        from: 'sender address',
        to: user.userEmail,
        subject: 'Welcome to Dunkirk',
        html,
      });
    } catch (error) {
      throw error;
    }
  };
}
