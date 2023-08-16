import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { SavePostDto } from '../dto/save-post.dto';
import { PostTypeEnum } from '@project/shared/blog';
import { fillObject } from '@project/core';
import { SaveImagePostDto } from '../dto/save-image-post.dto';
import { SaveLinkPostDto } from '../dto/save-link-post.dto';
import { SaveQuotationPostDto } from '../dto/save-quotation-post.dto';
import { SaveVideoPostDto } from '../dto/save-video-post.dto';
import { SaveTextPostDto } from '../dto/save-text-post.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostValidationPipe implements PipeTransform<SavePostDto> {
  async transform(value: SavePostDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    let post: SavePostDto;
    switch (value.type) {
      case PostTypeEnum.image:
        post = plainToInstance(SaveImagePostDto, value);
        break;
      case PostTypeEnum.link:
        post = plainToInstance(SaveLinkPostDto, value);
        break;
      case PostTypeEnum.quotation:
        post = plainToInstance(SaveQuotationPostDto, value);
        break;
      case PostTypeEnum.video:
        post = plainToInstance(SaveVideoPostDto, value);
        break;
      case PostTypeEnum.text:
        post = plainToInstance(SaveTextPostDto, value);
        break;
      default:
        throw new BadRequestException('Invalid post type');
    }

    const errors = await validate(post);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
