import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';

export interface ImagePostInterface extends PostInterface {
  type: PostTypeEnum.image;

  imgPath: string;
}
