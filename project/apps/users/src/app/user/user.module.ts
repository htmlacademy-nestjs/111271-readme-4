import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from './entities/user.model';
import { FollowerDefinition } from './entities/followers.model';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [MongooseModule.forFeature([UserDefinition, FollowerDefinition])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
