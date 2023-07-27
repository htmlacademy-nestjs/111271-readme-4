import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';

export class SaveTextPostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.text],
  })
  type!: PostTypeEnum.text;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  preview!: string;

  @ApiProperty()
  body!: string;
}
