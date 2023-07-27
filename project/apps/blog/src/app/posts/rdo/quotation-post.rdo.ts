import { BasePostRdo } from './base-post.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '@project/shared/blog';
import { Expose } from 'class-transformer';

export class QuotationPostRdo extends BasePostRdo {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.quotation],
  })
  @Expose()
  type!: PostTypeEnum.quotation;

  @ApiProperty()
  @Expose()
  quote!: string;

  @ApiProperty()
  @Expose()
  quoteAuthor!: string;
}
