import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repository/user/user.repository';
import { CreateUserModel } from '@app/repository/user/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async create(createUserInfo: CreateUserModel) {
    return await this.userRepo.saveUserInfo(createUserInfo);
  }
}
