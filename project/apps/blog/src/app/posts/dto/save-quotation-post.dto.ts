import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSavePostDto } from './base-save-post.dto';
import { IsString } from 'class-validator';

export class SaveQuotationPostDto extends BaseSavePostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.quotation],
  })
  type!: PostTypeEnum.quotation;

  @ApiProperty()
  @IsString()
  quote!: string;

  @ApiProperty()
  @IsString()
  quoteAuthor!: string;
}
