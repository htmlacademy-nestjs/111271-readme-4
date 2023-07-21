import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  id!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  email!: string;
}