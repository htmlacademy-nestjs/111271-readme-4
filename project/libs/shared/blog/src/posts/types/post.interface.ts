import { PostStateEnum } from './post-state.enum';
import { PostTypeEnum } from './post-type.enum';
import { Expose } from 'class-transformer';

export class PostInterface {
  @Expose()
  id?: number;

  @Expose()
  type!: PostTypeEnum;

  @Expose()
  authorId!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  state!: PostStateEnum;

  @Expose()
  isRepost!: boolean;

  @Expose()
  originalPostId?: number;

  @Expose()
  tags?: Array<string>;
}
