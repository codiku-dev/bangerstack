import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";

const messages = { en, fr } as const;
export type AppLocale = keyof typeof messages;

function getNested(obj: unknown, path: string): string {
  const keys = path.split(".");
  let cur: unknown = obj;
  for (const k of keys) {
    if (cur == null || typeof cur !== "object") return path;
    cur = (cur as Record<string, unknown>)[k];
  }
  return typeof cur === "string" ? cur : path;
}

type IntlCtx = {
  locale: AppLocale;
  setLocale: (l: AppLocale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

const IntlCtx = createContext<IntlCtx | null>(null);

export function IntlProvider(p: { children: ReactNode }) {
  const [locale, setLocale] = useState<AppLocale>("en");

  const t = useCallback(
    (key: string, values?: Record<string, string | number>) => {
      let s = getNested(messages[locale], key);
      if (values) {
        for (const [k, v] of Object.entries(values)) {
          s = s.replaceAll(`{${k}}`, String(v));
        }
      }
      return s;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return <IntlCtx.Provider value={value}>{p.children}</IntlCtx.Provider>;
}

export function useAppIntl(): IntlCtx {
  const v = useContext(IntlCtx);
  if (v == null) {
    throw new Error("useAppIntl must be used within IntlProvider");
  }
  return v;
}

/** Même ergonomie que `useTranslations(ns)` côté web (next-intl). */
export function useTranslations(namespace: string) {
  const { t: rawT } = useAppIntl();
  return useCallback(
    (key: string, values?: Record<string, string | number>) =>
      rawT(`${namespace}.${key}`, values),
    [namespace, rawT],
  );
}
