import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserCreateDto } from '../users/dto/user-create.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: UserCreateDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(createUserDto);
  }
}
