import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSavePostDto } from './base-save-post.dto';
import { IsString } from 'class-validator';

export class SaveVideoPostDto extends BaseSavePostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.video],
  })
  type!: PostTypeEnum.video;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  videoUrl!: string;
}
