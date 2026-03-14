/**
 * Generated from .env.local.development. 
 * Regenerated when .env.local.development changes (generate-env-types script).
 */
import { config } from "@dotenvx/dotenvx";
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
  // En dev on charge .env ; en prod l’env est déjà injecté par dotenvx run -f .env.production
  if (process.env['NODE_ENV'] === 'development') {
    config({ path: resolve(process.cwd(), '.env') });
  }
  return envSchema.parse(process.env);
}
