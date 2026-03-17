import { config } from "@dotenvx/dotenvx";
import { resolve } from "path";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@api/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { admin } from "better-auth/plugins"
import { createAuthMiddleware, APIError } from "better-auth/api";
import { sendEmail } from "@api/src/libs/email-libs";
import { ConfirmSignup } from "@repo/emails";
// Load env before creating Prisma (auth.ts runs at import time, before Nest ConfigModule).
// Use process.cwd() so it works from dist/ (nest start) where cwd is apps/api.
const apiRoot = process.cwd();

if (process.env['NODE_ENV'] === 'development') {
    config({ path: resolve(apiRoot, ".env") });
}

const connectionString = process.env.DATABASE_URL

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
        },
    },
    plugins: [
        admin(),
    ],
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            // console.log("BEFORE HOOK", ctx);
            return ctx;
        }),
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
        // debugLogs: true
    }),

    emailAndPassword: {
        enabled: true,

    },
    emailVerification: {
        sendOnSignUp: true,

        sendVerificationEmail: async ({ user, url, token }, request) => {
            void sendEmail({
                to: user.email,
                subject: "Verify your email address",
                component: ConfirmSignup({ name: user.name, url }),
            });
        },
    },
    trustedOrigins: [process.env.FRONTEND_URL],

});