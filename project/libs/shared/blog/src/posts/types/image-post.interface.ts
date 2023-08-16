import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';
import { Expose } from 'class-transformer';

export class ImagePost {
  @Expose()
  url!: string;
}

export interface ImagePostInterface extends PostInterface, ImagePost {
  type: PostTypeEnum.image;
}
