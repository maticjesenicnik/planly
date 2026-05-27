import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../prisma/generated/client';
import { ErrorMessages } from '../common/constants/error-messages';
import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    UserCreateDto: Prisma.UserCreateInput,
  ): Promise<UserResponseDto> {
    const user = await this.database.user.create({
      data: UserCreateDto,
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

  async update(
    id: string,
    UserUpdateDto: Prisma.UserUpdateInput,
  ): Promise<UserResponseDto> {
    const user = await this.database.user.update({
      where: {
        id,
      },
      data: UserUpdateDto,
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('user', id));
    }

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
