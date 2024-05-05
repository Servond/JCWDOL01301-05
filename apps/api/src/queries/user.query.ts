import { IUser } from '@/interfaces/user.interface';
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class UserQuery {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public getUserByEmailQuery = async (email: string): Promise<IUser | null> => {
    try {
      const user = await this.prisma.user.findFirst({
        select: {
          id: true,
          userName: true,
          userEmail: true,
          userPassword: true,
          isVerified: true,
          role: {
            select: {
              id: true,
            },
          },
        },
        where: {
          userEmail: email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  };
}
