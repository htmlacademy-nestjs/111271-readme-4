import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthPasswordService } from './services/auth-password.service';

@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [AuthService, AuthPasswordService],
})
export class AuthModule {}
