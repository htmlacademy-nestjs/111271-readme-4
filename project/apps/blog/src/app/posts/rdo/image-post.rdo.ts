import { BasePostRdo } from './base-post.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/shared/blog';
import { Expose } from 'class-transformer';

export class ImagePostRdo extends BasePostRdo {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.image],
  })
  @Expose()
  type!: PostTypeEnum.image;

  @ApiProperty()
  @Expose()
  url!: string;
}
