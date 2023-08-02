import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigLoader } from '../config/app.config';
import { dbConfigLoader } from '../config/db.config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '../config/mongoose.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfigLoader, dbConfigLoader],
      envFilePath: 'apps/users/users.env',
    }),
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
})
export class AppModule {}
