import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TaskPriority } from '../../../prisma/generated/enums';

export class TaskUpdatePriorityDto {
  @ApiProperty({
    description: 'Task priority',
  })
  @IsString()
  @IsNotEmpty()
  priority!: TaskPriority;
}
