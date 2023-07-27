import { PostStateEnum } from './post-state.enum';
import { PostTypeEnum } from './post-type.enum';

export interface PostInterface {
  id: string;

  type: PostTypeEnum;

  authorId: string;

  created: Date;

  published: Date;

  state: PostStateEnum;

  isRepost: boolean;

  originalPostId?: string;
}
