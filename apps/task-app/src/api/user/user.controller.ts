import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth0Service } from '@app/auth0';
import { SignUpDto } from 'apps/task-app/src/api/user/dto/sign-up.dto';
import { AuthConnectionType, GrantType } from '@app/auth0/auth0.enum';
import { LoginDto } from 'apps/task-app/src/api/user/dto/login.dto';

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

  @Post('login')
  async login(@Body() option: LoginDto) {
    const user = await this.auth0Service.login({
      grant_type: GrantType.PASSWORD,
      username: option.email,
      password: option.password,
      connection: AuthConnectionType.DATABASE,
      client_id: option.clientId,
      client_secret: option.client_secret,
    });
    const decoded = await this.auth0Service.decodeIdToken(user['id_token']);

    await this.userService.create({
      id: decoded.userId,
      auth0UserId: decoded.auth0UserId,
      email: decoded.email || '-',
      name: decoded.name,
    });
    return user;
  }

  @Post('signUp')
  async signUp(@Body() option: SignUpDto) {
    return await this.auth0Service.signup({
      ...option,
      connection: AuthConnectionType.DATABASE,
      client_id: option.clientId,
      client_secret: option.client_secret,
    });
  }
}
