import { BasePostRdo } from './base-post.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/shared/blog';
import { Expose } from 'class-transformer';

export class VideoPostRdo extends BasePostRdo {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.video],
  })
  @Expose()
  type!: PostTypeEnum.video;

  @ApiProperty()
  @Expose()
  title!: string;

  @ApiProperty()
  @Expose()
  videoUrl!: string;
}
