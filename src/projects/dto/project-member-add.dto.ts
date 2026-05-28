import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProjectRole } from '../../../prisma/generated/client';

export class ProjectMemberAddDto {
  @ApiProperty({ example: 'cm5z8f9k20000user123456' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ enum: ProjectRole, default: ProjectRole.CONTRIBUTOR })
  @IsEnum(ProjectRole)
  role?: ProjectRole = ProjectRole.CONTRIBUTOR;
}
