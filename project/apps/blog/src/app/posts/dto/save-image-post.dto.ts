import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSavePostDto } from './base-save-post.dto';
import { IsString } from 'class-validator';

export class SaveImagePostDto extends BaseSavePostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.image],
  })
  type!: PostTypeEnum.image;

  @ApiProperty()
  @IsString()
  url!: string;
}
