import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiCreateProjectResponse,
  ApiDeleteProjectResponse,
  ApiGetProjectResponse,
  ApiRestoreProjectResponse,
  ApiUpdateProjectResponse,
} from './decorators/project-api-responses';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreateProjectResponse()
  async create(
    @Body() ProjectCreateDto: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.create(ProjectCreateDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all projects' })
  @ApiGetProjectResponse({ multiple: true })
  async findAll(): Promise<ProjectResponseDto[]> {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find a project' })
  @ApiGetProjectResponse({ multiple: false })
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    return await this.projectsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a project' })
  @ApiUpdateProjectResponse()
  async update(
    @Param('id') id: string,
    @Body() ProjectUpdateDto: ProjectUpdateDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.update(id, ProjectUpdateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a project' })
  @ApiDeleteProjectResponse()
  async remove(@Param('id') id: string): Promise<ProjectResponseDto> {
    return await this.projectsService.remove(id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted project' })
  @ApiRestoreProjectResponse()
  async restore(@Param('id') id: string): Promise<ProjectResponseDto> {
    return await this.projectsService.restore(id);
  }
}
