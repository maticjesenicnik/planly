import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProjectRole } from '../../../prisma/generated/client';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class ProjectMemberResponseDto {
  @ApiProperty({ example: 'cm5z8f9k20000user123456' })
  id!: string;

  @ApiProperty()
  projectId!: string;

  @ApiProperty()
  user!: UserResponseDto;

  @ApiProperty({ enum: ProjectRole, default: ProjectRole.CONTRIBUTOR })
  @IsEnum(ProjectRole)
  role?: ProjectRole = ProjectRole.CONTRIBUTOR;
}
