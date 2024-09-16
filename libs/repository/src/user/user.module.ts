import { Module } from '@nestjs/common';
import { UserRepository } from '@app/repository/user/user.repository';
import { PrismaModule } from '@app/repository/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
