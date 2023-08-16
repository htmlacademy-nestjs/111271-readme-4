import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSavePostDto } from './base-save-post.dto';
import { IsString } from 'class-validator';

export class SaveTextPostDto extends BaseSavePostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.text],
  })
  type!: PostTypeEnum.text;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  preview!: string;

  @ApiProperty()
  @IsString()
  body!: string;
}
