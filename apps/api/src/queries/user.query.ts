import { HttpException } from '@/exceptions/http.exception';
import { IUser } from '@/interfaces/user.interface';
import { PrismaClient, User } from '@prisma/client';
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

  public matchUserReferralCodeQuery = async (
    refCode: string,
  ): Promise<User> => {
    try {
      //1. find and match ref code from another user
      const referrerUser = await this.prisma.user.findFirst({
        where: {
          userReferralCode: refCode,
        },
      });

      if (!referrerUser) throw new HttpException(500, 'Invalid Referral Code');

      return referrerUser;
    } catch (error) {
      throw error;
    }
  };

  public referralBonusQuery = async (
    user: User,
    redeemedBy: number,
  ): Promise<void> => {
    try {
      //1. code referrer got points
      const expiredDate = new Date(
        new Date().setMonth(new Date().getMonth() + 3),
      );
      await this.prisma.point.create({
        data: {
          pointQty: 10000,
          pointStartDate: new Date(),
          pointEndDate: expiredDate,
          isUsed: false,
          pointByUserId: redeemedBy,
          userId: user.id,
        },
      });

      //2. user who redeem referral code got discount coupon
      const coupon = await this.prisma.coupon.create({
        data: {
          couponKey:
            user.userName + 'RefCode' + Math.random().toString(36).slice(2),
          couponName: 'Refferal Code Discount',
          couponDesc: `You got Discount Coupon from ${user.userName}! Use it now ...`,
          couponStartDate: new Date(),
          couponEndDate: expiredDate,
        },
      });

      await this.prisma.mapUserCoupon.create({
        data: {
          couponId: coupon.id,
          userId: redeemedBy,
        },
      });
    } catch (error) {
      throw error;
    }
  };
}
