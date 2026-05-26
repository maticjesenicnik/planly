import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 400,
    description: 'HTTP status code',
  })
  statusCode!: number;

  @ApiProperty({
    example: ['email must be an email', 'password is too weak'],
    description: 'Error messages (can be string or array)',
    isArray: true,
  })
  message!: string | string[];

  @ApiProperty({
    example: 'Bad Request',
    description: 'Error type',
  })
  error!: string;
}
