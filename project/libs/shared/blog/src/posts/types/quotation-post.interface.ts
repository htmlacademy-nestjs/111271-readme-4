import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';
import { Expose } from 'class-transformer';

export class QuotationPost {
  @Expose()
  quote!: string;

  @Expose()
  quoteAuthor!: string;
}

export interface QuotationPostInterface extends PostInterface, QuotationPost {
  type: PostTypeEnum.quotation;
}
