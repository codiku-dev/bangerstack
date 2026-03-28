"use client";

import { ReactQueryProvider } from "@mobile/providers/react-query-provider";
import { TrpcProvider } from "@mobile/providers/trpc-provider";
import { IntlProvider } from "@mobile/providers/intl-provider";

export function Providers(p: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <IntlProvider>
        <ReactQueryProvider>{p.children}</ReactQueryProvider>
      </IntlProvider>
    </TrpcProvider>
  );
}
