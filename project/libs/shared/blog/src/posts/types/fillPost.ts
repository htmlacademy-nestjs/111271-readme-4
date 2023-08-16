import { fillObject } from '@project/core';
import { ImagePostInterface, ImagePost } from './image-post.interface';
import { PostTypeEnum } from './post-type.enum';
import { LinkPostInterface, LinkPost } from './link-post.interface';
import {
  QuotationPostInterface,
  QuotationPost,
} from './quotation-post.interface';
import { TextPost, TextPostInterface } from './text-post.interface';
import { VideoPostInterface, VideoPost } from './video-post.interface';

type BlogPostEntity =
  | ImagePostInterface
  | LinkPostInterface
  | QuotationPostInterface
  | TextPostInterface
  | VideoPostInterface;

export const fillPostByType = (post: BlogPostEntity): BlogPostEntity => {
  let item = post;

  switch (post.type) {
    case PostTypeEnum.image:
      item = fillObject(ImagePost, item) as BlogPostEntity;
      break;
    case PostTypeEnum.link:
      item = fillObject(LinkPost, item) as BlogPostEntity;
      break;
    case PostTypeEnum.quotation:
      item = fillObject(QuotationPost, item) as BlogPostEntity;
      break;
    case PostTypeEnum.text:
      item = fillObject(TextPost, item) as BlogPostEntity;
      break;
    case PostTypeEnum.video:
      item = fillObject(VideoPost, item) as BlogPostEntity;
      break;
  }

  return item;
};
