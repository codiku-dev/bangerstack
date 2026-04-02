import { z } from "zod";

export const envSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z.string().url().optional(),
  EXPO_PUBLIC_GOOGLE_AUTH_CALLBACK_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

declare global {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export function parseEnv(): Env {
  return envSchema.parse(process.env);
}
