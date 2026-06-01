import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ValidationMessages } from '../../common/constants/error-messages';

export class UserCreateDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: ValidationMessages.PROPERTY_REQUIRED('email') })
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: ValidationMessages.PROPERTY_REQUIRED('username') })
  username!: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty({ message: ValidationMessages.PROPERTY_REQUIRED('password') })
  password!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: ValidationMessages.PROPERTY_REQUIRED('name') })
  name!: string;
}
