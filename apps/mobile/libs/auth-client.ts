import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { getApiBaseUrl } from "@/libs/get-api-base-url";

const authClient = createAuthClient({
  baseURL: `${getApiBaseUrl()}/api/auth`,
  plugins: [adminClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;
export { authClient };
