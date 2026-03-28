/* eslint-disable @typescript-eslint/no-namespace -- matches apps/web ProcessEnv augmentation */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { z } from "zod";

export const envSchema = z.object({
  /** IP LAN du PC pour dev (réécriture de localhost côté app native). */
  NEXT_PUBLIC_LAN_HOST: z.string().optional(),
  NEXT_PUBLIC_API_BASE_URL: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_AUTH_CALLBACK_URL: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export function parseEnv(): Env {
  return envSchema.parse(process.env);
}
