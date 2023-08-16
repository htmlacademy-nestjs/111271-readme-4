import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';
import { Expose } from 'class-transformer';

export class LinkPost {
  @Expose()
  link!: string;

  @Expose()
  description?: string;
}

export interface LinkPostInterface extends PostInterface, LinkPost {
  type: PostTypeEnum.link;
}
