import {
  ImagePostInterface,
  LinkPostInterface,
  QuotationPostInterface,
  TextPostInterface,
  VideoPostInterface,
} from '@project/shared/blog';

export type BlogPostEntity =
  | ImagePostInterface
  | LinkPostInterface
  | QuotationPostInterface
  | TextPostInterface
  | VideoPostInterface;
