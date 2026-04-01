// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "@dotenvx/dotenvx";
import { getAllowedCapDevOrigins } from "./libs/dev-server-origin";

const dir = path.dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "development") {
  loadEnv({ path: path.resolve(dir, ".env") });
  loadEnv({ path: path.resolve(dir, ".env.local.development") });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Export statique → dossier `out/` pour Capacitor (`webDir: "out"`) quand `server.url` est absent en prod. */
  output: "export",
  images: {
    unoptimized: true,
  },
  /** Uniquement en dev : évite d’exécuter la résolution LAN pendant `next build` (export statique). */
  ...(process.env["NODE_ENV"] === "development"
    ? { allowedDevOrigins: getAllowedCapDevOrigins() }
    : {}),
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
