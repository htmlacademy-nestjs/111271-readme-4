import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseSavePostDto } from './base-save-post.dto';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class SaveLinkPostDto extends BaseSavePostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.link],
  })
  type!: PostTypeEnum.link;

  @ApiProperty()
  @IsUrl()
  link!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}
