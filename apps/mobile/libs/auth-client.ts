import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { getApiBaseUrl } from "@/libs/get-api-base-url";

const base = getApiBaseUrl();

const authClient = createAuthClient({
  baseURL: `${base}/api/auth`,
  plugins: [adminClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;
export { authClient };
