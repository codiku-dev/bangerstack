import { queryClient } from "@/libs/react-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function ReactQueryProvider(p: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>;
}
