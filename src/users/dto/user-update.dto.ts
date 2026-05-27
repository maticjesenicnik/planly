import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({
    required: false,
  })
  email?: string;

  @ApiProperty({
    required: false,
  })
  name?: string;
}
