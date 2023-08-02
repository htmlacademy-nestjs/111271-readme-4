import { UserEntityInterface } from '@project/shared/users';

export class UserEntity implements UserEntityInterface {
  id?: string;

  firstname!: string;

  lastname!: string;

  email!: string;

  passwordHash!: string;

  avatarPath?: string;
}
