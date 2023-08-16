import { PostInterface } from './post.interface';
import { PostTypeEnum } from './post-type.enum';
import { Expose } from 'class-transformer';

export class TextPost {
  @Expose()
  title!: string;

  @Expose()
  preview!: string;

  @Expose()
  body!: string;
}

export interface TextPostInterface extends PostInterface, TextPost {
  type: PostTypeEnum.text;
}
