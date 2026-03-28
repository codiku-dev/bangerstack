import type { CapacitorConfig } from "@capacitor/cli";



const config: CapacitorConfig = {
  appId: "com.bangerstack.mobile",
  appName: "BangerStack",
  webDir: "out",
  android: {
    allowMixedContent: true,
  },
  server: {
    url: "http://127.0.0.1:3001",
    cleartext: true,
  },
};

export default config;
