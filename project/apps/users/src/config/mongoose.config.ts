import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import { dbConfigLoader } from './db.config';
import { getMongoConnectionString } from '@project/core';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (dbConfig: ConfigType<typeof dbConfigLoader>) => {
      return {
        uri: getMongoConnectionString({
          username: dbConfig.user,
          password: dbConfig.password,
          host: dbConfig.host,
          port: dbConfig.port,
          authDatabase: dbConfig.authBase,
          databaseName: dbConfig.name,
        }),
      };
    },
    inject: [dbConfigLoader.KEY],
  };
}
