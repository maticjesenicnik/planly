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
import { ApiGetLabelResponse } from '../projects/decorators/project-api-responses';
import { LabelResponseDto } from '../projects/dto/label-response.dto';
import {
  ApiDeleteTaskResponse,
  ApiGetTaskResponse,
  ApiRestoreTaskResponse,
  ApiUpdateTaskResponse,
} from '../tasks/decorators/task-api-responses';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskUpdateAssigneeDto } from './dto/task-update-assignee.dto';
import { TaskUpdateDescriptionDto } from './dto/task-update-description.dto';
import { TaskUpdateDueDateDto } from './dto/task-update-due-date.dto';
import { TaskUpdateParentDto } from './dto/task-update-parent.dto';
import { TaskUpdatePriorityDto } from './dto/task-update-priority.dto';
import { TaskUpdateReporterDto } from './dto/task-update-reporter.dto';
import { TaskUpdateStatusDto } from './dto/task-update-status.dto';
import { TaskUpdateTitleDto } from './dto/task-update-title.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all tasks' })
  @ApiGetTaskResponse({ multiple: true })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<TaskResponseDto[]> {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find a task' })
  @ApiGetTaskResponse({ multiple: false })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
    return await this.tasksService.findOne(id);
  }

  @Get(':id/labels')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find task labels' })
  @ApiGetLabelResponse({ multiple: true })
  @ApiBearerAuth('bearer')
  async getTaskLabels(@Param('id') id: string): Promise<LabelResponseDto[]> {
    return await this.tasksService.getTaskLabels(id);
  }

  @Patch(':id/title')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task title' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updateTitle(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateTitleDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateTitle(id, updateDto.title);
  }

  @Patch(':id/assignee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task assignee' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updateAssignee(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateAssigneeDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateAssignee(id, updateDto.assigneeId);
  }

  @Patch(':id/description')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task description' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updateDescription(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateDescriptionDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateDescription(id, updateDto.description);
  }

  @Patch(':id/reporter')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task reporter' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updateReporter(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateReporterDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateReporter(id, updateDto.reporterId);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task status' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateStatusDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateStatus(id, updateDto.status);
  }

  @Patch(':id/priority')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task priority' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updatePriority(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdatePriorityDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updatePriority(id, updateDto.priority);
  }

  @Patch(':id/dueDate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task due date' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updateDueDate(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateDueDateDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateDueDate(id, updateDto.dueDate);
  }

  @Patch(':id/parent')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update task parent' })
  @ApiUpdateTaskResponse()
  @ApiBearerAuth('bearer')
  async updateParent(
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateParentDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateParent(id, updateDto.parentId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a task' })
  @ApiDeleteTaskResponse()
  @ApiBearerAuth('bearer')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.tasksService.delete(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted task' })
  @ApiRestoreTaskResponse()
  @ApiBearerAuth('bearer')
  async restore(@Param('id') id: string): Promise<TaskResponseDto> {
    return await this.tasksService.restore(id);
  }
}
