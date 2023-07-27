import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';

export class SaveQuotationPostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.quotation],
  })
  type!: PostTypeEnum.quotation;

  @ApiProperty()
  quote!: string;

  @ApiProperty()
  quoteAuthor!: string;
}
