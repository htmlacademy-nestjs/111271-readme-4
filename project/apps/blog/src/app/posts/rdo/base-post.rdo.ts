import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostStateEnum } from '@project/shared/blog';
import { Expose, Type } from 'class-transformer';

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
  updatedAt!: Date;

  @ApiProperty({
    enum: PostStateEnum,
    enumName: 'PostStateEnum',
  })
  @Expose()
  state!: PostStateEnum;

  @ApiPropertyOptional()
  @Expose()
  originalPostId?: string;

  @Expose()
  @Type(() => String)
  tags?: Array<string>;

  @ApiProperty()
  @Expose()
  isRepost!: boolean;
}
