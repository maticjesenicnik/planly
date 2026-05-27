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
  ApiCreateUserResponse,
  ApiDeleteUserResponse,
  ApiGetUserResponse,
  ApiRestoreUserResponse,
  ApiUpdateUserResponse,
} from './decorators/user-api-responses';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreateUserResponse()
  async create(@Body() UserCreateDto: UserCreateDto): Promise<UserResponseDto> {
    return await this.usersService.create(UserCreateDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all users' })
  @ApiGetUserResponse({ multiple: true })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find a user based on id' })
  @ApiGetUserResponse({ multiple: false })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a user' })
  @ApiUpdateUserResponse()
  async update(
    @Param('id') id: string,
    @Body() UserUpdateDto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.update(id, UserUpdateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete an user' })
  @ApiDeleteUserResponse()
  async remove(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.remove(id);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore a soft-deleted user' })
  @ApiRestoreUserResponse()
  async restore(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.restore(id);
  }
}
