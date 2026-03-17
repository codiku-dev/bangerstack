import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type Lang = "en" | "fr";

const apiRoot = process.cwd();
const i18nCache = new Map<Lang, unknown>();

export function getLangFromRequest(p: { request: unknown }): Lang {
  const headers =
    (p.request as { headers?: Record<string, string | string[] | undefined> })
      ?.headers ?? {};

  const raw = headers["accept-language"];
  const first = Array.isArray(raw) ? raw[0] : raw;
  const lang = first?.split(",")?.[0]?.trim()?.toLowerCase();

  if (lang?.startsWith("fr")) return "fr";
  return "en";
}

function getTranslations(p: { lang: Lang }) {
  const cached = i18nCache.get(p.lang);
  if (cached) return cached as Record<string, unknown>;

  const isProd = process.env["NODE_ENV"] === "production";
  const base = resolve(apiRoot, isProd ? "dist/i18n" : "src/i18n");
  const filePath = resolve(base, p.lang, "common.json");

  const json = JSON.parse(readFileSync(filePath, "utf8")) as Record<
    string,
    unknown
  >;
  i18nCache.set(p.lang, json);
  return json;
}

export function t(p: { lang: Lang; key: string }): string {
  const dict = getTranslations({ lang: p.lang });
  const value = p.key
    .split(".")
    .reduce<unknown>((acc, k) => (acc as Record<string, unknown>)?.[k], dict) as string;

  return value;
}

