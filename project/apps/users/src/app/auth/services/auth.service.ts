import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { UserMemoryRepository } from '../../user/repositories/user-memory.repository';
import { Injectable } from '@nestjs/common';
import { AuthPasswordService } from './auth-password.service';
import { VerifyUserDto } from '../dto/verify-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserMemoryRepository,
    private passwordService: AuthPasswordService
  ) {}

  public async createUser(user: CreateUserDto): Promise<UserEntity | null> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      return null;
    }

    const passwordHash = await this.passwordService.generatePasswordHash(
      user.password
    );
    const { email, firstname, lastname } = user;

    return this.userRepository.create({
      email,
      firstname,
      lastname,
      passwordHash,
    });
  }

  public async verifyUser(login: VerifyUserDto): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(login.email);
    if (!user) {
      return null;
    }

    const isActualPassword = await this.passwordService.comparePassword(
      login.password,
      user.passwordHash
    );
    if (!isActualPassword) {
      return null;
    }

    return user;
  }
}
