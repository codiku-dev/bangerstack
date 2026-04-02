import { IntlProvider } from "@/providers/intl-provider";
import type { ReactNode } from "react";
import { ReactQueryProvider } from "./react-query-provider";

export function Providers(p: { children: ReactNode }) {
  return (
    <IntlProvider>
      <ReactQueryProvider>{p.children}</ReactQueryProvider>
    </IntlProvider>
  );
}
