// src/projects/dto/project-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class ProjectResponseDto {
  @ApiProperty({
    description: 'Project ID',
    example: 'cm5z8f9k20000123456789abc',
  })
  id!: string;

  @ApiProperty({
    description: 'Project name',
    example: 'Mobile App Redesign',
  })
  name!: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Complete redesign of our flagship mobile application',
    required: false,
  })
  description?: string | null;

  @ApiProperty({
    description: 'Unique project key',
    example: 'MOBILE',
  })
  key!: string;

  @ApiProperty({
    description: 'Owner ID',
    example: 'cm5z8f9k20000123456789def',
  })
  ownerId!: string;

  @ApiProperty({
    description: 'Project owner details',
    type: () => UserResponseDto,
  })
  owner!: UserResponseDto;

  constructor(partial: Partial<ProjectResponseDto>) {
    Object.assign(this, partial);
  }
}
