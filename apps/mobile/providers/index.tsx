"use client";

import { ReactQueryProvider } from "@/providers/react-query-provider";
import { TrpcProvider } from "@/providers/trpc-provider";
import { IntlProvider } from "./intl-provider";

export function Providers(p: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <IntlProvider>
        <ReactQueryProvider>{p.children}</ReactQueryProvider>
      </IntlProvider>
    </TrpcProvider>
  );
}
