// src/common/decorators/api-responses.decorator.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../../common/dto/error-response-dto';
import { TaskResponseDto } from '../dto/task-response.dto';

export const ApiCreateTaskResponse = () =>
  applyDecorators(
    ApiCreatedResponse({
      description: 'Task successfully created',
      type: TaskResponseDto,
    }),
  );

export const ApiGetTaskResponse = ({ multiple }: { multiple: boolean }) =>
  applyDecorators(
    ApiOkResponse({ type: TaskResponseDto, isArray: multiple || false }),
    ApiNotFoundResponse({
      description: 'Task not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiUpdateTaskResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: TaskResponseDto }),
    ApiNotFoundResponse({
      description: 'Task to update not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiDeleteTaskResponse = () =>
  applyDecorators(
    ApiOkResponse(),
    ApiNotFoundResponse({
      description: 'Task to delete not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiRestoreTaskResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: TaskResponseDto }),
    ApiNotFoundResponse({
      description: 'Task to restore not found',
      type: ErrorResponseDto,
    }),
  );
