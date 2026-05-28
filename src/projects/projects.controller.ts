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
  ApiAddProjectMemberResponse,
  ApiCreateProjectResponse,
  ApiDeleteProjectMemberResponse,
  ApiDeleteProjectResponse,
  ApiGetProjectResponse,
  ApiRestoreProjectResponse,
  ApiUpdateProjectMemberRoleResponse,
  ApiUpdateProjectResponse,
} from './decorators/project-api-responses';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectMemberAddDto } from './dto/project-member-add.dto';
import { ProjectMemberResponseDto } from './dto/project-member-response.dto';
import { ProjectMemberUpdateRoleDto } from './dto/project-member-update-role.dto';
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
    @Body() projectCreateDto: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.create(projectCreateDto);
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
    @Body() projectUpdateDto: ProjectUpdateDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.update(id, projectUpdateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a project' })
  @ApiDeleteProjectResponse()
  async remove(@Param('id') id: string): Promise<void> {
    return await this.projectsService.remove(id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted project' })
  @ApiRestoreProjectResponse()
  async restore(@Param('id') id: string): Promise<ProjectResponseDto> {
    return await this.projectsService.restore(id);
  }

  @Post(':id/members')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add a new member to the project' })
  @ApiAddProjectMemberResponse()
  async addMember(
    @Param('id') id: string,
    @Body() projectMemberAddDto: ProjectMemberAddDto,
  ): Promise<ProjectMemberResponseDto> {
    return await this.projectsService.addMember(id, projectMemberAddDto);
  }

  @Patch(':id/members/:userId/role')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update member role on the project' })
  @ApiUpdateProjectMemberRoleResponse()
  async updateMemberRole(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() dto: ProjectMemberUpdateRoleDto,
  ): Promise<ProjectMemberResponseDto> {
    return await this.projectsService.updateMemberRole(id, userId, dto);
  }

  @Delete(':id/members/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove member from project' })
  @ApiDeleteProjectMemberResponse()
  async removeMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return await this.projectsService.removeMember(id, userId);
  }
}
