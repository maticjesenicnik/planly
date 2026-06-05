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
    const project = await this.database.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('project', id));
    }
  }

  protected async validateLabelExists(id: string): Promise<void> {
    const label = await this.database.label.findUnique({
      where: { id },
    });

    if (!label) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('label', id));
    }
  }

  protected async validateTaskExists(id: string): Promise<void> {
    const task = await this.database.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('task', id));
    }
  }
}
