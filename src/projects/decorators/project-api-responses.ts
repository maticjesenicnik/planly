// src/common/decorators/api-responses.decorator.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../../common/dto/error-response-dto';
import { LabelResponseDto } from '../dto/label-response.dto';
import { ProjectMemberResponseDto } from '../dto/project-member-response.dto';
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
    ApiOkResponse(),
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

export const ApiGetProjectMemberResponse = ({
  multiple,
}: {
  multiple: boolean;
}) =>
  applyDecorators(
    ApiOkResponse({
      type: ProjectMemberResponseDto,
      isArray: multiple || false,
    }),
    ApiNotFoundResponse({
      description: 'Project or user not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiAddProjectMemberResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: ProjectMemberResponseDto }),
    ApiNotFoundResponse({
      description: 'Project or user not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiUpdateProjectMemberRoleResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: ProjectMemberResponseDto }),
    ApiNotFoundResponse({
      description: 'Project or user not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiDeleteProjectMemberResponse = () =>
  applyDecorators(
    ApiOkResponse(),
    ApiNotFoundResponse({
      description: 'Project or user not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiGetLabelResponse = ({ multiple }: { multiple: boolean }) =>
  applyDecorators(
    ApiOkResponse({ type: LabelResponseDto, isArray: multiple || false }),
    ApiNotFoundResponse({
      description: 'Project not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiCreateLabelResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: LabelResponseDto }),
    ApiNotFoundResponse({
      description: 'Project not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiUpdateLabelResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: LabelResponseDto }),
    ApiNotFoundResponse({
      description: 'Project or label not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiDeleteLabelResponse = () =>
  applyDecorators(
    ApiOkResponse(),
    ApiNotFoundResponse({
      description: 'Project or label not found',
      type: ErrorResponseDto,
    }),
  );
