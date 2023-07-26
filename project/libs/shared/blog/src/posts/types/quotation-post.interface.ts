import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';

export interface QuotationPostInterface extends PostInterface {
  type: PostTypeEnum.quotation;

  quote: string;

  quoteAuthor: string;
}
