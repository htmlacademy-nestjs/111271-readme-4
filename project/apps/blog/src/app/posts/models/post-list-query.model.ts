import { PostStateEnum, PostTypeEnum } from '@project/shared/blog';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class PostListQueryModel {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page!: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit!: number;

  @ApiPropertyOptional({ isArray: true })
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  userIds?: Array<string>;

  @ApiPropertyOptional({
    isArray: true,
    enum: PostTypeEnum,
    enumName: 'PostTypeEnum',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value
  )
  @IsArray()
  @IsEnum(PostTypeEnum, { each: true })
  @IsOptional()
  types?: Array<PostTypeEnum>;

  @ApiPropertyOptional({ enum: PostStateEnum, enumName: 'PostStateEnum' })
  @IsEnum(PostStateEnum)
  @IsOptional()
  state?: PostStateEnum;

  @ApiPropertyOptional({ isArray: true })
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: Array<string>;

  @ApiProperty()
  sortBy!: string;

  @ApiProperty({ enum: ['asc', 'desc'] })
  @IsIn(['asc', 'desc'])
  order!: 'asc' | 'desc';
}
