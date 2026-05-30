import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '../../prisma/generated/client';
import { ErrorMessages } from '../common/constants/error-messages';
import { BaseService } from '../common/services/base.service';
import { DatabaseService } from '../database/database.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService extends BaseService {
  constructor(database: DatabaseService) {
    super(database);
  }

  async create(userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    const existingUser = await this.findOneByEmail(userCreateDto.email);
    if (existingUser) {
      throw new ConflictException(
        ErrorMessages.ALREADY_EXISTS('user', 'email', userCreateDto.email),
      );
    }

    const saltRounds = 10;
    userCreateDto.passwordHash = await bcrypt.hash(
      userCreateDto.password,
      saltRounds,
    );

    const user = await this.database.user.create({
      data: userCreateDto,
    });

    return new UserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.database.user.findMany({});
    return users.map((user) => new UserResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('user', id));
    }

    return new UserResponseDto(user);
  }

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.database.user.findUnique({
      where: {
        email,
      },
      omit: { passwordHash: false },
    });

    if (!user) {
      throw new NotFoundException(
        ErrorMessages.NOT_FOUND('user', email, 'email'),
      );
    }

    return new UserResponseDto(user);
  }

  async update(
    id: string,
    UserUpdateDto: Prisma.UserUpdateInput,
  ): Promise<UserResponseDto> {
    await this.validateUserExists(id);

    const user = await this.database.user.update({
      where: {
        id,
      },
      data: UserUpdateDto,
    });

    return new UserResponseDto(user);
  }

  async remove(id: string): Promise<UserResponseDto> {
    const user = await this.database.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('user', id));
    }

    return new UserResponseDto(user);
  }

  async restore(id: string): Promise<UserResponseDto> {
    const user = await this.database.user.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('user', id));
    }

    return new UserResponseDto(user);
  }
}
