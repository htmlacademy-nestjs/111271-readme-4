import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';

export interface TextPostInterface extends PostInterface {
  type: PostTypeEnum.text;

  title: string;

  preview: string;

  body: string;
}
