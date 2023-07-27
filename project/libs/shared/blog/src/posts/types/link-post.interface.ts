import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';

export interface LinkPostInterface extends PostInterface {
  type: PostTypeEnum.link;

  link: string;

  description?: string;
}
