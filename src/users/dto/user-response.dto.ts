import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique user identifier',
    example: 'cmpm7bxrz00014irx0usyjtxs',
  })
  id!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'When the user was created',
    example: '2025-05-26T10:30:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'When the user was last updated',
    example: '2025-05-26T12:45:00.000Z',
  })
  updatedAt!: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
