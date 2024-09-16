import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryModule } from '@app/repository/user/user.module';
import { Auth0Module } from '@app/auth0';

@Module({
  imports: [UserRepositoryModule, Auth0Module],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
