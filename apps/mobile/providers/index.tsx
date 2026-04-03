import type { ReactNode } from "react";
import { IntlProvider } from "@/providers/intl-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { TrpcProvider } from "@/providers/trpc-provider";

export function Providers(p: { children: ReactNode }) {
  return (
    <IntlProvider>
      <TrpcProvider>
        <ReactQueryProvider>{p.children}</ReactQueryProvider>
      </TrpcProvider>
    </IntlProvider>
  );
}
