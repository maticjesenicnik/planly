import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskPriority, TaskStatus } from '../../../prisma/generated/enums';

export class TaskResponseDto {
  @ApiProperty({
    description: 'Task ID',
    example: 'cm5z8f9k20000123456789abc',
  })
  id!: string;

  @ApiProperty({
    description: 'Task title',
  })
  title!: string;

  @ApiProperty({
    description: 'Task description',
  })
  description?: string | null;

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
  dueDate?: Date | null;

  @ApiProperty({
    description: 'Task project id',
  })
  projectId!: string;

  @ApiProperty({
    description: 'Task assignee id',
  })
  assigneeId?: string | null;

  @ApiProperty({
    description: 'Task reporter id',
  })
  reporterId!: string;

  @ApiProperty({
    description: 'Task parent id',
  })
  parentId?: string | null;

  constructor(partial: Partial<TaskResponseDto>) {
    Object.assign(this, partial);
  }
}
