"use client";

import { Capacitor } from "@capacitor/core";
import { Fullscreen } from "@boengli/capacitor-fullscreen";
import { useEffect } from "react";

async function applyImmersive() {
  if (!Capacitor.isNativePlatform()) return;
  await Fullscreen.activateImmersiveMode();
}

/**
 * Edge-to-edge + immersive bars. Requires `viewportFit: 'cover'` on the page —
 * otherwise Capacitor's SystemBars listener keeps top padding and the status bar zone stays visible.
 */
export function NativeChrome() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await new Promise((r) => {
        setTimeout(r, 50);
      });
      if (cancelled) return;
      try {
        await applyImmersive();
      } catch {
        /* native bridge not ready or web */
      }
    };

    void run();

    const onVisibility = () => {
      if (document.visibilityState === "visible") void applyImmersive();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
