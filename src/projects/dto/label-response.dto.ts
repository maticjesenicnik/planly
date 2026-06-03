import { ApiProperty } from '@nestjs/swagger';

export class LabelResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  color?: string | null;

  @ApiProperty()
  projectId!: string;

  constructor(partial: Partial<LabelResponseDto>) {
    Object.assign(this, partial);
  }
}
