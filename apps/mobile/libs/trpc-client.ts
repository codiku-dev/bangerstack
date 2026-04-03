import {
  type CreateTRPCReact,
  createTRPCReact,
  httpBatchLink,
  loggerLink,
} from "@trpc/react-query";
import type { AppRouter } from "@repo/trpc/router";
import { QueryClient } from "@tanstack/react-query";
import { getApiBaseUrl } from "@/libs/get-api-base-url";

export const trpc: CreateTRPCReact<AppRouter, object> =
  createTRPCReact<AppRouter, object>();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const baseUrl = `${getApiBaseUrl()}/trpc`;

export const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: (opts) =>
        (typeof __DEV__ !== "undefined" && __DEV__) ||
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: baseUrl,
    }),
  ],
});
