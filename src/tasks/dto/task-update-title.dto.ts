import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskUpdateTitleDto {
  @ApiProperty({
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;
}
