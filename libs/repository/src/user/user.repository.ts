import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@app/repository/prisma/prisma.service';
import { GenericRepository } from '@app/repository/common/generic.repository';
import { CreateUserModel } from '@app/repository/user/user.model';
@Injectable()
export class UserRepository extends GenericRepository<
  User,
  Prisma.UserWhereUniqueInput,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput,
  Prisma.UserInclude,
  CreateUserModel
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, Prisma.ModelName.User);
  }

  async saveUserInfo(createUserInfo: CreateUserModel): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        auth0UserId: createUserInfo.auth0UserId,
        email: createUserInfo.email,
      },
    });
    if (existingUser) {
      return existingUser;
    }
    return await this.prisma.user.create({
      data: {
        id: createUserInfo.id,
        name: createUserInfo.name,
        email: createUserInfo.email,
        auth0UserId: createUserInfo.auth0UserId,
      },
    });
  }
}
