// src/common/decorators/api-responses.decorator.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../../common/dto/error-response-dto';
import { ProjectResponseDto } from '../dto/project-response.dto';

export const ApiCreateProjectResponse = () =>
  applyDecorators(
    ApiCreatedResponse({
      description: 'Project successfully created',
      type: ProjectResponseDto,
    }),
  );

export const ApiGetProjectResponse = ({ multiple }: { multiple: boolean }) =>
  applyDecorators(
    ApiOkResponse({ type: ProjectResponseDto, isArray: multiple || false }),
    ApiNotFoundResponse({
      description: 'Project not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiUpdateProjectResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: ProjectResponseDto }),
    ApiNotFoundResponse({
      description: 'Project to update not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiDeleteProjectResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: ProjectResponseDto }),
    ApiNotFoundResponse({
      description: 'Project to delete not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiRestoreProjectResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: ProjectResponseDto }),
    ApiNotFoundResponse({
      description: 'Project to restore not found',
      type: ErrorResponseDto,
    }),
  );
