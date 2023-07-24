import { ImagePostRdo } from './image-post.rdo';
import { LinkPostRdo } from './link-post.rdo';
import { QuotationPostRdo } from './quotation-post.rdo';
import { TextPostRdo } from './text-post.rdo';
import { VideoPostRdo } from './video-post.rdo';
import { BlogPostEntity } from '../entities/blog-post.entity';
import { PostTypeEnum } from '@project/shared/blog';
import { fillObject } from '@project/core';

export type PostRdo =
  | ImagePostRdo
  | LinkPostRdo
  | QuotationPostRdo
  | TextPostRdo
  | VideoPostRdo;

export const PostRdoList = [
  ImagePostRdo,
  LinkPostRdo,
  QuotationPostRdo,
  TextPostRdo,
  VideoPostRdo,
];

export const fillPostRdo = (post: BlogPostEntity): PostRdo => {
  switch (post.type) {
    case PostTypeEnum.image:
      return fillObject(ImagePostRdo, post);
    case PostTypeEnum.link:
      return fillObject(LinkPostRdo, post);
    case PostTypeEnum.quotation:
      return fillObject(QuotationPostRdo, post);
    case PostTypeEnum.text:
      return fillObject(TextPostRdo, post);
    case PostTypeEnum.video:
      return fillObject(VideoPostRdo, post);
  }
};
