import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';

export interface VideoPostInterface extends PostInterface {
  type: PostTypeEnum.video;

  title: string;

  videoUrl: string;
}
