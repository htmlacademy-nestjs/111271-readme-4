import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty } from '@nestjs/swagger';

export class SaveVideoPostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.video],
  })
  type!: PostTypeEnum.video;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  videoUrl!: string;
}
