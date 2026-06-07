import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskPriority, TaskStatus } from '../../prisma/generated/enums';
import { ErrorMessages } from '../common/constants/error-messages';
import { InvalidStatusTransitionException } from '../common/exceptions/invalid-status-transition.exception';
import { labelFullSelect } from '../common/selects/label.select';
import { taskFullSelect } from '../common/selects/task.select';
import { BaseService } from '../common/services/base.service';
import { DatabaseService } from '../database/database.service';
import { LabelResponseDto } from '../projects/dto/label-response.dto';
import { isTaskTransitionAllowed } from './constants/transitions.constant';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TasksService extends BaseService {
  constructor(database: DatabaseService) {
    super(database);
  }

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.database.task.findMany({
      select: taskFullSelect,
    });

    return tasks.map((task) => new TaskResponseDto(task));
  }

  async findOne(id: string): Promise<TaskResponseDto> {
    const task = await this.database.task.findUnique({
      where: { id },
      select: taskFullSelect,
    });

    if (!task) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('task', id));
    }

    return new TaskResponseDto(task);
  }

  async getTaskLabels(id: string): Promise<LabelResponseDto[]> {
    const labels = await this.database.taskLabel.findMany({
      where: { taskId: id },
      select: { label: { select: labelFullSelect } },
    });

    return labels.map(
      (label) =>
        new LabelResponseDto({
          id: label.label.id,
          name: label.label.name,
          color: label.label.color,
          projectId: label.label.projectId,
        }),
    );
  }

  async updateTitle(id: string, title: string): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.database.task.update({
      where: { id },
      data: { title },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }

  async updateAssignee(
    id: string,
    assigneeId: string,
  ): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);
    await this.validateUserExists(assigneeId);

    const task = await this.database.task.update({
      where: { id },
      data: { assigneeId },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }

  async updateDescription(
    id: string,
    description: string,
  ): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.database.task.update({
      where: { id },
      data: { description },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }

  async updateReporter(
    id: string,
    reporterId: string,
  ): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);
    await this.validateUserExists(reporterId);

    const task = await this.database.task.update({
      where: { id },
      data: { reporterId },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }

  async updateStatus(id: string, status: TaskStatus): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.database.task.findFirstOrThrow({
      where: { id },
      select: taskFullSelect,
    });

    if (!isTaskTransitionAllowed(task.status, status)) {
      throw new InvalidStatusTransitionException(task.status, status);
    }

    const updatedTask = await this.database.task.update({
      where: { id },
      data: { status },
      select: taskFullSelect,
    });

    return new TaskResponseDto(updatedTask);
  }

  async updatePriority(
    id: string,
    priority: TaskPriority,
  ): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.database.task.update({
      where: { id },
      data: { priority },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }

  async updateDueDate(
    id: string,
    dueDate: Date | undefined,
  ): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.database.task.update({
      where: { id },
      data: { dueDate },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }

  async updateParent(id: string, parentId: string): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.database.task.update({
      where: { id },
      data: { parentId },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }

  async delete(id: string): Promise<void> {
    await this.validateTaskExists(id);

    await this.database.task.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: taskFullSelect,
    });
  }

  async restore(id: string): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.database.task.update({
      where: { id },
      data: { deletedAt: null },
      select: taskFullSelect,
    });

    return new TaskResponseDto(task);
  }
}
