// src/common/decorators/api-responses.decorator.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../../common/dto/error-response-dto';
import { UserResponseDto } from '../dto/user-response-dto';

export const ApiCreateUserResponse = () =>
  applyDecorators(
    ApiCreatedResponse({
      description: 'User successfully created',
      type: UserResponseDto,
    }),
  );

export const ApiGetUserResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: UserResponseDto }),
    ApiNotFoundResponse({
      description: 'User not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiGetUsersResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: UserResponseDto, isArray: true }),
    ApiNotFoundResponse({
      description: 'User not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiUpdateUserResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: UserResponseDto }),
    ApiNotFoundResponse({
      description: 'User to update not found',
      type: ErrorResponseDto,
    }),
  );

export const ApiDeleteUserResponse = () =>
  applyDecorators(
    ApiOkResponse({ type: UserResponseDto }),
    ApiNotFoundResponse({
      description: 'User to delete not found',
      type: ErrorResponseDto,
    }),
  );
