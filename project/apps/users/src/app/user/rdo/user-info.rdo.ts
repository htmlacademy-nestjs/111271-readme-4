import { Expose } from 'class-transformer';

export class UserInfoRdo {
  @Expose()
  id!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;
}
