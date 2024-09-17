import { ApiProperty } from '@nestjs/swagger';
import { ClientInfo } from 'apps/task-app/src/api/user/dto/client-info.dto';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto extends ClientInfo {
  @ApiProperty({
    description: 'email',
    example: 'abc@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'StrongPassword123!',
  })
  @IsString()
  password: string;
}
