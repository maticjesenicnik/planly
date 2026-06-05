import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessages } from '../common/constants/error-messages';
import { labelFullSelect } from '../common/selects/label.select';
import { projectMemberFullSelect } from '../common/selects/project-member.select';
import { projectFullSelect } from '../common/selects/project.select';
import { taskFullSelect } from '../common/selects/task.select';
import { BaseService } from '../common/services/base.service';
import { DatabaseService } from '../database/database.service';
import { TaskCreateDto } from '../tasks/dto/task-create.dto';
import { TaskResponseDto } from '../tasks/dto/task-response.dto';
import { LabelCreateDto } from './dto/label-create.dto';
import { LabelResponseDto } from './dto/label-response.dto';
import { LabelUpdateDto } from './dto/label-update.dto';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectMemberAddDto } from './dto/project-member-add.dto';
import { ProjectMemberResponseDto } from './dto/project-member-response.dto';
import { ProjectMemberUpdateRoleDto } from './dto/project-member-update-role.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';

@Injectable()
export class ProjectsService extends BaseService {
  constructor(database: DatabaseService) {
    super(database);
  }

  async create(
    projectCreateDto: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    await this.validateUserExists(projectCreateDto.ownerId);

    const project = await this.database.project.create({
      data: {
        name: projectCreateDto.name,
        description: projectCreateDto.description,
        key: projectCreateDto.key,
        ownerId: projectCreateDto.ownerId,
      },
      select: projectFullSelect,
    });

    return new ProjectResponseDto(project);
  }

  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.database.project.findMany({
      select: projectFullSelect,
    });

    return projects.map((project) => new ProjectResponseDto(project));
  }

  async findOne(id: string) {
    const project = await this.database.project.findUnique({
      where: {
        id,
      },
      select: projectFullSelect,
    });

    if (!project) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('project', id));
    }

    return new ProjectResponseDto(project);
  }

  async update(id: string, projectCreateDto: ProjectUpdateDto) {
    await this.validateProjectExists(id);
    if (projectCreateDto.ownerId) {
      await this.validateUserExists(projectCreateDto.ownerId);
    }

    const project = await this.database.project.update({
      where: { id },
      data: {
        name: projectCreateDto.name,
        description: projectCreateDto.description,
        ownerId: projectCreateDto.ownerId,
      },
      select: projectFullSelect,
    });

    return new ProjectResponseDto(project);
  }

  async delete(id: string): Promise<ProjectResponseDto> {
    await this.validateProjectExists(id);

    const project = await this.database.project.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: projectFullSelect,
    });

    return new ProjectResponseDto(project);
  }

  async restore(id: string): Promise<ProjectResponseDto> {
    await this.validateProjectExists(id);

    const project = await this.database.project.update({
      where: { id },
      data: { deletedAt: null },
      select: projectFullSelect,
    });

    return new ProjectResponseDto(project);
  }

  async getProjectMembers(id: string): Promise<ProjectMemberResponseDto[]> {
    await this.validateProjectExists(id);

    return await this.database.projectMember.findMany({
      where: { projectId: id },
      select: projectMemberFullSelect,
    });
  }

  async addMember(
    id: string,
    member: ProjectMemberAddDto,
  ): Promise<ProjectMemberResponseDto> {
    await this.validateProjectExists(id);
    await this.validateUserExists(member.userId);

    const existing = await this.database.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: member.userId,
          projectId: id,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('User is already a member of this project');
    }

    return await this.database.projectMember.create({
      data: {
        projectId: id,
        userId: member.userId,
        role: member.role,
      },
      select: projectMemberFullSelect,
    });
  }

  async updateMemberRole(
    id: string,
    userId: string,
    member: ProjectMemberUpdateRoleDto,
  ): Promise<ProjectMemberResponseDto> {
    await this.validateProjectExists(id);
    await this.validateUserExists(userId);

    return await this.database.projectMember.update({
      where: {
        userId_projectId: {
          projectId: id,
          userId,
        },
      },
      data: {
        role: member.role,
      },
      select: projectMemberFullSelect,
    });
  }

  async deleteMember(id: string, userId: string): Promise<void> {
    await this.validateProjectExists(id);
    await this.validateUserExists(userId);

    await this.database.projectMember.delete({
      where: { userId_projectId: { projectId: id, userId } },
    });
  }

  async createLabel(
    id: string,
    labelCreateDto: LabelCreateDto,
  ): Promise<LabelResponseDto> {
    await this.validateProjectExists(id);

    const existing = await this.database.label.findFirst({
      where: {
        AND: [{ projectId: id }, { name: labelCreateDto.name }],
      },
    });

    if (existing) {
      throw new BadRequestException('Label already exists in project');
    }

    const label = await this.database.label.create({
      data: {
        name: labelCreateDto.name,
        color: labelCreateDto.color,
        projectId: id,
      },
      select: labelFullSelect,
    });

    return new LabelResponseDto(label);
  }

  async findLabel(
    projectId: string,
    labelId: string,
  ): Promise<LabelResponseDto> {
    await this.validateProjectExists(projectId);

    const label = await this.database.label.findUnique({
      where: { projectId, id: labelId },
      select: labelFullSelect,
    });

    if (!label) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('label', labelId));
    }

    return new LabelResponseDto(label);
  }

  async findAllLabels(projectId: string): Promise<LabelResponseDto[]> {
    await this.validateProjectExists(projectId);

    const labels = await this.database.label.findMany({
      where: { projectId },
      select: labelFullSelect,
    });

    return labels.map((label) => new LabelResponseDto(label));
  }

  async updateLabel(
    labelId: string,
    updateLabelDto: LabelUpdateDto,
  ): Promise<LabelResponseDto> {
    await this.validateLabelExists(labelId);

    const label = await this.database.label.update({
      where: {
        id: labelId,
      },
      data: {
        name: updateLabelDto.name,
        color: updateLabelDto.color,
      },
      select: labelFullSelect,
    });

    return new LabelResponseDto(label);
  }

  async deleteLabel(id: string, labelId: string): Promise<void> {
    await this.validateProjectExists(id);
    await this.validateLabelExists(labelId);

    await this.database.label.delete({
      where: { id: labelId },
    });
  }

  async createProjectTask(
    id: string,
    taskDto: TaskCreateDto,
  ): Promise<TaskResponseDto> {
    await this.validateProjectExists(id);
    const task = await this.database.$transaction(async (tx) => {
      const lastTask = await tx.task.findFirst({
        where: { projectId: id },
        orderBy: { number: 'desc' },
        select: { number: true },
      });

      const nextNumber: number = Number(lastTask?.number ?? 0) + 1;

      const task = await tx.task.create({
        data: {
          ...taskDto,
          projectId: id,
          number: nextNumber,
          labels: {
            create: taskDto.labels?.map((labelId: string) => ({
              label: {
                connect: { id: labelId },
              },
            })),
          },
        },
        select: taskFullSelect,
      });

      return task;
    });

    return new TaskResponseDto(task);
  }

  async findProjectTasks(id: string): Promise<TaskResponseDto[]> {
    await this.validateProjectExists(id);

    const tasks = await this.database.task.findMany({
      where: { projectId: id },
      select: taskFullSelect,
    });

    return tasks.map((task) => new TaskResponseDto(task));
  }
}
