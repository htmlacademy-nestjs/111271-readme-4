import { ApiProperty } from '@nestjs/swagger';

export class SavePostCommentDto {
  @ApiProperty()
  body!: string;
}
