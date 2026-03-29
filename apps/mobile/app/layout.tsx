import { Providers } from "@/providers";
import "@/styles/globals.css";
import type { Viewport } from "next";
import { NativeChrome } from "@/app/native-chrome";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout(p: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-dvh">
        <NativeChrome />
        <Providers>{p.children}</Providers>
      </body>
    </html>
  );
}
