import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';
import { Expose } from 'class-transformer';

export class VideoPost {
  @Expose()
  title!: string;

  @Expose()
  url!: string;
}

export interface VideoPostInterface extends PostInterface, VideoPost {
  type: PostTypeEnum.video;
}
