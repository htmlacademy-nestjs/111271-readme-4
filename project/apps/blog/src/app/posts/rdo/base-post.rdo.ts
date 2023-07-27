import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostStateEnum } from '@project/shared/blog';
import { Expose } from 'class-transformer';

export class BasePostRdo {
  @ApiProperty()
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  authorId!: string;

  @ApiProperty()
  @Expose()
  createdAt!: Date;

  @ApiProperty()
  @Expose()
  publishedAt!: Date;

  @ApiProperty({
    enum: PostStateEnum,
    enumName: 'PostStateEnum',
  })
  @Expose()
  state!: PostStateEnum;

  @ApiProperty()
  @Expose()
  isRepost!: boolean;

  @ApiPropertyOptional()
  @Expose()
  originalPostId?: string;
}
