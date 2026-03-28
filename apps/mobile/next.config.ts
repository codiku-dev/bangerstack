// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "@dotenvx/dotenvx";
import { getAllowedCapDevOrigins } from "./lib/dev-server-origin";

const dir = path.dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "development") {
  loadEnv({ path: path.resolve(dir, ".env") });
  loadEnv({ path: path.resolve(dir, ".env.local.development") });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Hôtes autorisés pour HMR / `/_next/*` en dev (`localhost` vs `127.0.0.1` = origines différentes). */
  allowedDevOrigins: getAllowedCapDevOrigins(),
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
