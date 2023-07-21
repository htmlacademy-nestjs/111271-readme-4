import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserMemoryRepository } from './repositories/user-memory.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserMemoryRepository],
  exports: [UserMemoryRepository],
})
export class UserModule {}
