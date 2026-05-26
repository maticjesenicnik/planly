import { Injectable } from '@nestjs/common';
import { Prisma, User } from '../../prisma/generated/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return await this.database.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.database.user.findMany({});
  }

  async findOne(id: string): Promise<User | null> {
    return await this.database.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.database.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.database.user.delete({
      where: {
        id,
      },
    });
  }
}
