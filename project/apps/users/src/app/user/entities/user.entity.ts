import { UserEntityInterface } from '@project/user';

export class UserEntity implements UserEntityInterface {
  id!: string;

  firstname!: string;

  lastname!: string;

  email!: string;

  passwordHash!: string;

  avatarPath?: string;
}
