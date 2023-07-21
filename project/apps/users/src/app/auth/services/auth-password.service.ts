import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../constants/password.constant';

@Injectable()
export class AuthPasswordService {
  public async generatePasswordHash(password: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(password, salt);
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return compare(password, hash);
  }
}
