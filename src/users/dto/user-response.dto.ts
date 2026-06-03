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
    description: 'User username',
    example: 'johndoe',
  })
  @IsString()
  username!: string;

  passwordHash?: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
