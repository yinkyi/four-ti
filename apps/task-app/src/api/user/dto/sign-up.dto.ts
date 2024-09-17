import { ApiProperty } from '@nestjs/swagger';
import { ClientInfo } from 'apps/task-app/src/api/user/dto/client-info.dto';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto extends ClientInfo {
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

  @ApiProperty({
    description: 'user name',
    example: 'johndoe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'name',
    example: 'John',
  })
  @IsString()
  name: string;
}
