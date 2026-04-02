import Constants from "expo-constants";

/** Port API par défaut du monorepo (`apps/api` → `3090`). */
const DEFAULT_DEV_API = "http://127.0.0.1:3090";

/**
 * Base URL de l’API (sans slash final). Priorité :
 * `EXPO_PUBLIC_API_BASE_URL` → `expo.extra.apiBaseUrl` dans app.config → défaut local.
 * Sur appareil physique : utilise l’IP LAN de ta machine (ex. `http://192.168.1.10:3090`).
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env["EXPO_PUBLIC_API_BASE_URL"]?.trim();
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, "");
  }
  const extra = Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined;
  const fromExtra = extra?.apiBaseUrl?.trim();
  if (fromExtra && fromExtra.length > 0) {
    return fromExtra.replace(/\/$/, "");
  }
  return DEFAULT_DEV_API;
}
