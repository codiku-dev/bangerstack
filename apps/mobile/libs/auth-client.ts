import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/auth',
  plugins: [
    adminClient(),
  ],
});

export const { useSession, signIn, signUp, signOut } = authClient;
export { authClient };