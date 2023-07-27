import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/shared/blog';
import { BasePostRdo } from './base-post.rdo';
import { Expose } from 'class-transformer';

export class TextPostRdo extends BasePostRdo {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.text],
  })
  @Expose()
  type!: PostTypeEnum.text;

  @ApiProperty()
  @Expose()
  title!: string;

  @ApiProperty()
  @Expose()
  preview!: string;

  @ApiProperty()
  @Expose()
  body!: string;
}
