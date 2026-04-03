import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/trpc-client";

export function ReactQueryProvider(p: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
  );
}
