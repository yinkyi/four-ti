import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth0Service } from '@app/auth0';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly auth0Service: Auth0Service,
  ) {}

  @Post()
  async create(@Body() option: CreateUserDto) {
    const decoded = await this.auth0Service.decodeIdToken(option.idToken);
    return await this.userService.create({
      id: decoded.userId,
      auth0UserId: decoded.auth0UserId,
      email: decoded.email || '-',
      name: decoded.name,
    });
  }
}
