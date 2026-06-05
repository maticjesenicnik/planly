import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriority, TaskStatus } from '../../../prisma/generated/enums';

export class TaskCreateDto {
  @ApiProperty({
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Task description',
  })
  description?: string;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @IsEnum(TaskStatus)
  status?: TaskStatus = TaskStatus.TODO;

  @ApiProperty({
    description: 'Task priority',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  @IsEnum(TaskPriority)
  priority?: TaskPriority = TaskPriority.MEDIUM;

  @ApiProperty({
    description: 'Task due date',
  })
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  dueDate?: Date;

  @ApiProperty({
    description: 'Task assignee id',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  assigneeId?: string;

  @ApiProperty({
    description: 'Task reporter id',
  })
  @IsString()
  @IsNotEmpty()
  reporterId!: string;

  @ApiProperty({
    description: 'Task parent id',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId?: string;

  @ApiProperty({
    description: 'Task labels',
    isArray: true,
  })
  @IsOptional()
  labels?: string[];
}
