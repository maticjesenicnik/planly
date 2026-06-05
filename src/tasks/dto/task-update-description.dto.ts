import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskUpdateDescriptionDto {
  @ApiProperty({
    description: 'Task description',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;
}
