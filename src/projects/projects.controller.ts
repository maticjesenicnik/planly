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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  ApiAddProjectMemberResponse,
  ApiCreateLabelResponse,
  ApiCreateProjectResponse,
  ApiDeleteLabelResponse,
  ApiDeleteProjectMemberResponse,
  ApiDeleteProjectResponse,
  ApiGetLabelResponse,
  ApiGetProjectMemberResponse,
  ApiGetProjectResponse,
  ApiRestoreProjectResponse,
  ApiUpdateLabelResponse,
  ApiUpdateProjectMemberRoleResponse,
  ApiUpdateProjectResponse,
} from './decorators/project-api-responses';
import { LabelCreateDto } from './dto/label-create.dto';
import { LabelResponseDto } from './dto/label-response.dto';
import { LabelUpdateDto } from './dto/label-update.dto';
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
  @ApiBearerAuth('bearer')
  async create(
    @Body() projectCreateDto: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.create(projectCreateDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all projects' })
  @ApiGetProjectResponse({ multiple: true })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<ProjectResponseDto[]> {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find a project' })
  @ApiGetProjectResponse({ multiple: false })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    return await this.projectsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a project' })
  @ApiUpdateProjectResponse()
  @ApiBearerAuth('bearer')
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
  @ApiBearerAuth('bearer')
  async remove(@Param('id') id: string): Promise<ProjectResponseDto> {
    return await this.projectsService.delete(id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted project' })
  @ApiRestoreProjectResponse()
  @ApiBearerAuth('bearer')
  async restore(@Param('id') id: string): Promise<ProjectResponseDto> {
    return await this.projectsService.restore(id);
  }

  @Get(':id/members')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add a new member to the project' })
  @ApiGetProjectMemberResponse({ multiple: true })
  @ApiBearerAuth('bearer')
  async getProjectMembers(
    @Param('id') id: string,
  ): Promise<ProjectMemberResponseDto[]> {
    return await this.projectsService.getProjectMembers(id);
  }

  @Post(':id/members')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add a new member to the project' })
  @ApiAddProjectMemberResponse()
  @ApiBearerAuth('bearer')
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
  @ApiBearerAuth('bearer')
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
  @ApiBearerAuth('bearer')
  async removeMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return await this.projectsService.deleteMember(id, userId);
  }

  @Get(':id/labels/:labelId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get detailed information about a label' })
  @ApiBearerAuth('bearer')
  @ApiGetLabelResponse({ multiple: true })
  async getLabel(@Param('id') id: string): Promise<LabelResponseDto[]> {
    return await this.projectsService.findAllLabels(id);
  }

  @Get(':id/labels')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all project labels' })
  @ApiBearerAuth('bearer')
  @ApiGetLabelResponse({ multiple: true })
  async getLabels(@Param('id') id: string): Promise<LabelResponseDto[]> {
    return await this.projectsService.findAllLabels(id);
  }

  @Post(':id/labels')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add a new label to the project' })
  @ApiCreateLabelResponse()
  @ApiBearerAuth('bearer')
  async createLabel(
    @Param('id') id: string,
    @Body() labelCreateDto: LabelCreateDto,
  ): Promise<LabelResponseDto> {
    return await this.projectsService.createLabel(id, labelCreateDto);
  }

  @Patch(':id/labels/:labelId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update label on the project' })
  @ApiUpdateLabelResponse()
  @ApiBearerAuth('bearer')
  async updateLabel(
    @Param('id') id: string,
    @Param('labelId') labelId: string,
    @Body() dto: LabelUpdateDto,
  ): Promise<LabelResponseDto> {
    return await this.projectsService.updateLabel(labelId, dto);
  }

  @Delete(':id/labels/:labelId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove label from project' })
  @ApiDeleteLabelResponse()
  @ApiBearerAuth('bearer')
  async removeLabel(
    @Param('id') id: string,
    @Param('labelId') labelId: string,
  ): Promise<void> {
    return await this.projectsService.deleteLabel(id, labelId);
  }
}
