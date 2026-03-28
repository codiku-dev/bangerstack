import type { CapacitorConfig } from "@capacitor/cli";
import { getCapacitorDevServerUrl } from "./libs/dev-server-origin";

const devServerUrl = getCapacitorDevServerUrl();

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
