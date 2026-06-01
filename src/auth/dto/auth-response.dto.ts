import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthResponseDto {
  @ApiProperty()
  user!: UserResponseDto;

  @ApiProperty()
  @IsString()
  accessToken!: string;
}
