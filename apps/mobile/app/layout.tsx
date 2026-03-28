import { Providers } from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BangerStack Mobile",
  description: "Capacitor · Next.js · tRPC",
};

export default function RootLayout(p: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-dvh">
        <Providers>{p.children}</Providers>
      </body>
    </html>
  );
}
