import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostCommentRdo {
  @ApiProperty()
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  body!: string;

  @ApiProperty()
  @Expose()
  createdAt!: Date;
}
