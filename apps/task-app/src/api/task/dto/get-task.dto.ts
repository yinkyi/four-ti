import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Transform } from 'class-transformer';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class GetTaskDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'The title of the task',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'complete the task',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  completed?: boolean;
}
