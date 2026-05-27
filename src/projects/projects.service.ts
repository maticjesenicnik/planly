import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessages } from '../common/constants/error-messages';
import { DatabaseService } from '../database/database.service';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    projectCreateDto: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
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
      include: { owner: true },
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
    const project = await this.database.project.update({
      where: { id },
      data: {
        name: projectCreateDto.name,
        description: projectCreateDto.description,
        ownerId: projectCreateDto.ownerId,
      },
      include: { owner: true },
    });

    if (!project) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('project', id));
    }

    return new ProjectResponseDto(project);
  }

  async remove(id: string) {
    const project = await this.database.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      include: { owner: true },
    });

    if (!project) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('project', id));
    }

    return new ProjectResponseDto(project);
  }

  async restore(id: string): Promise<ProjectResponseDto> {
    const user = await this.database.project.update({
      where: { id },
      data: {
        deletedAt: null,
      },
      include: { owner: true },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND('project', id));
    }

    return new ProjectResponseDto(user);
  }
}
