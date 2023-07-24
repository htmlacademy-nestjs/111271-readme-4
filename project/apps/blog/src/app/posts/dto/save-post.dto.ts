import { SaveLinkPostDto } from './save-link-post.dto';
import { SaveTextPostDto } from './save-text-post.dto';
import { SaveImagePostDto } from './save-image-post.dto';
import { SaveQuotationPostDto } from './save-quotation-post.dto';
import { SaveVideoPostDto } from './save-video-post.dto';

export type SavePostDto =
  | SaveLinkPostDto
  | SaveTextPostDto
  | SaveImagePostDto
  | SaveQuotationPostDto
  | SaveVideoPostDto;

export const SavePostDtoList = [
  SaveLinkPostDto,
  SaveTextPostDto,
  SaveImagePostDto,
  SaveQuotationPostDto,
  SaveVideoPostDto,
];
