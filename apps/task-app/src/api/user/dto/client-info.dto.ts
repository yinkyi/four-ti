import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ClientInfo {
  @ApiProperty({
    description: 'client id',
    example: 'twi9V0owaaGrk6eW6yMTY70J9R7Ggfgk',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    description: 'client Secret',
    example: 'NbyNUcxOMgaHDfiGYbPSgD9UMsHAoI9Spp9saNsm-cFDA8enx8kT-zJ8nUcuFc8P',
  })
  @IsString()
  client_secret: string;
}
