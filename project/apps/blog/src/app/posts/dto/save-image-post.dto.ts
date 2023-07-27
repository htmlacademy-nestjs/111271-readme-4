import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';

export class SaveImagePostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.image],
  })
  type!: PostTypeEnum.image;

  @ApiProperty()
  imgPath!: string;
}
