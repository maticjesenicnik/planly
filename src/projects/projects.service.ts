import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessages } from '../common/constants/error-messages';
import { BaseService } from '../common/services/base.service';
import { DatabaseService } from '../database/database.service';
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
      include: {
        owner: true,
      },
    });

    return new ProjectResponseDto(project);
  }

  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.database.project.findMany({
      include: { owner: true, members: true },
    });
    return projects.map((project) => new ProjectResponseDto(project));
  }

  async findOne(id: string) {
    const project = await this.database.project.findUnique({
      where: {
        id,
      },
      include: { owner: true },
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
      include: { owner: true },
    });

    return new ProjectResponseDto(project);
  }

  async remove(id: string): Promise<void> {
    await this.validateProjectExists(id);

    await this.database.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      include: { owner: true },
    });
  }

  async restore(id: string): Promise<ProjectResponseDto> {
    await this.validateProjectExists(id);

    const project = await this.database.project.update({
      where: { id },
      data: {
        deletedAt: null,
      },
      include: { owner: true },
    });

    return new ProjectResponseDto(project);
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

    return this.database.projectMember.create({
      data: {
        projectId: id,
        userId: member.userId,
        role: member.role,
      },
      include: { user: true },
    });
  }

  async updateMemberRole(
    id: string,
    userId: string,
    member: ProjectMemberUpdateRoleDto,
  ): Promise<ProjectMemberResponseDto> {
    await this.validateProjectExists(id);
    await this.validateUserExists(userId);

    return this.database.projectMember.update({
      where: {
        userId_projectId: {
          projectId: id,
          userId,
        },
      },
      data: {
        role: member.role,
      },
      include: { user: true },
    });
  }

  async removeMember(id: string, userId: string): Promise<void> {
    await this.validateProjectExists(id);
    await this.validateUserExists(userId);

    await this.database.projectMember.delete({
      where: { userId_projectId: { projectId: id, userId } },
    });
  }
}
