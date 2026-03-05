import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"

export const { useSession, signIn, signUp, signOut } = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/auth',
    plugins: [
        adminClient(),
    ],
});