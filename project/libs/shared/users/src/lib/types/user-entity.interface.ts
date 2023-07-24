export interface UserEntityInterface<Id = string> {
  id: Id;
  firstname: string;
  lastname: string;
  email: string;
  passwordHash: string;
  avatarPath?: string;
}
