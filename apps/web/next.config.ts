// @ts-check
import { config as loadEnv } from "@dotenvx/dotenvx";
import createNextIntlPlugin from "next-intl/plugin";

loadEnv()

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [process.env.NEXT_PUBLIC_API_BASE_URL],
  transpilePackages: ['@repo/ui'],
};

export default withNextIntl(nextConfig);
