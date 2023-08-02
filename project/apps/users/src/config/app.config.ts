import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export interface AppConfig {
  environment: string;
  port: number;
}

const DEFAULT_PORT = 3000;

const validationSchema = Joi.object<AppConfig>({
  environment: Joi.string()
    .valid('development', 'production', 'stage')
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

export const appConfigLoader = registerAs('app', (): AppConfig => {
  const config: AppConfig = {
    environment: process.env.NODE_ENV!,
    port: parseInt(process.env.PORT || String(DEFAULT_PORT), 10),
  };

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[App Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`
    );
  }

  return config;
});
