import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class TaskUpdateParentDto {
  @ApiProperty({
    description: 'Task parent',
  })
  @IsDate()
  @IsNotEmpty()
  parentId!: string;
}
