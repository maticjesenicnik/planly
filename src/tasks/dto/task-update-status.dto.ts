import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../../../prisma/generated/enums';

export class TaskUpdateStatusDto {
  @ApiProperty({
    description: 'Task status',
  })
  @IsString()
  @IsNotEmpty()
  status!: TaskStatus;
}
