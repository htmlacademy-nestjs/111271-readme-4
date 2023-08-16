import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SavePostCommentDto {
  @ApiProperty()
  @IsString()
  body!: string;
}
