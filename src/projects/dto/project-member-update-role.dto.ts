import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProjectRole } from '../../../prisma/generated/client';

export class ProjectMemberUpdateRoleDto {
  @ApiProperty({ enum: ProjectRole, default: ProjectRole.CONTRIBUTOR })
  @IsEnum(ProjectRole)
  role?: ProjectRole = ProjectRole.CONTRIBUTOR;
}
