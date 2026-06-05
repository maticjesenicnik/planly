import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskUpdateReporterDto {
  @ApiProperty({
    description: 'Task reporter',
  })
  @IsString()
  @IsNotEmpty()
  reporterId!: string;
}
