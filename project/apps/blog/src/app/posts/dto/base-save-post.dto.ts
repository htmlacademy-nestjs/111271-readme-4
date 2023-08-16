import { ApiProperty } from '@nestjs/swagger';
import { PostStateEnum, PostTypeEnum } from '@project/shared/blog';
import { Type } from 'class-transformer';
import { IsEnum, IsString, IsArray } from 'class-validator';

export abstract class BaseSavePostDto {
  abstract type: PostTypeEnum;

  @ApiProperty()
  @IsString()
  authorId!: string;

  @ApiProperty({ enum: PostStateEnum, enumName: 'PostStateEnum' })
  @IsEnum(PostStateEnum)
  state!: PostStateEnum;

  @ApiProperty({ isArray: true })
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  tags?: Array<string>;
}
