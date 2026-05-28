import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../prisma/generated/client';
import { ErrorMessages } from '../common/constants/error-messages';
import { BaseService } from '../common/services/base.service';
import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService extends BaseService {
  constructor(database: DatabaseService) {
    super(database);
  }

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
