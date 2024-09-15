import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Transform } from 'class-transformer';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class GetTodoDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'The title of the todo',
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
