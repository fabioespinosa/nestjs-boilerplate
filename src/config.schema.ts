import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432).required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
