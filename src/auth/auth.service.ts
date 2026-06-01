import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ErrorMessages } from '../common/constants/error-messages';
import { UserCreateDto } from '../users/dto/user-create.dto';
import { UsersService } from '../users/users.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new ConflictException(
        ErrorMessages.ALREADY_EXISTS('user', 'email', email),
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash!);
    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorMessages.INCORRECT_CREDENTIALS);
    }

    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...authUser } = user;

    return {
      user: authUser,
      accessToken,
    };
  }

  async register(createUserDto: UserCreateDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create(createUserDto);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { user, accessToken };
  }
}
