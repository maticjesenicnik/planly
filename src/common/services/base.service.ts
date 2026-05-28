import { NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ErrorMessages } from '../constants/error-messages';

export abstract class BaseService {
  protected constructor(protected readonly database: DatabaseService) {}

  protected async validateUserExists(id: string): Promise<void> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('user', id));
    }
  }

  protected async validateProjectExists(id: string): Promise<void> {
    const user = await this.database.project.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('project', id));
    }
  }
}
