import { BasePostRdo } from './base-post.rdo';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/shared/blog';
import { Expose } from 'class-transformer';

export class LinkPostRdo extends BasePostRdo {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.link],
  })
  @Expose()
  type!: PostTypeEnum.link;

  @ApiProperty()
  @Expose()
  link!: string;

  @ApiPropertyOptional()
  @Expose()
  description?: string;
}
