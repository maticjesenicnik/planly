import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class TaskUpdateDueDateDto {
  @ApiProperty({
    description: 'Task due date',
  })
  @IsDate()
  @IsNotEmpty()
  dueDate!: Date;
}
