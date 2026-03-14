/**
 * Generated from .env.local.development. 
 * Regenerated when .env.local.development changes (generate-env-types script).
 */
import { config } from "dotenv";
import { z } from "zod";
import { resolve } from "node:path";

export const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  FRONTEND_URL: z.string(),

});

export type Env = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env { }
  }
}

export function parseEnv(): Env {
  if (process.env['NODE_ENV'] === 'development') {
    config({ path: resolve(__dirname, '.env') });
  } else {
    config({ path: resolve(__dirname, '.env.production') });
  }
  console.log(" the env in parseEnv")
  return envSchema.parse(process.env);
}
