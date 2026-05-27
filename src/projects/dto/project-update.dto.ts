import { PartialType } from '@nestjs/swagger';
import { ProjectCreateDto } from './project-create.dto';

export class ProjectUpdateDto extends PartialType(ProjectCreateDto) {}
