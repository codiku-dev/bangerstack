import type { CapacitorConfig } from "@capacitor/cli";
import { getCapacitorDevServerUrl } from "./lib/dev-server-origin";

/** Origine du dev server (souvent `http://<LAN_HOST>:3001` depuis `dev-server-origin`). */
const devServerUrl = getCapacitorDevServerUrl();

console.log("devServerUrl", devServerUrl);
const config: CapacitorConfig = {
  appId: "com.bangerstack.mobile",
  appName: "BangerStack",
  webDir: "out",
  android: {
    allowMixedContent: true,
  },
  ...(devServerUrl
    ? {
      server: {
        url: devServerUrl,
        cleartext: true,
      },
    }
    : {}),
};

export default config;
