"use client";

import { init, miniApp, retrieveLaunchParams } from "@telegram-apps/sdk";

let initialized = false;

export function initTelegram() {
  if (initialized || typeof window === "undefined") return;

  try {
    init();

    if (miniApp.mount.isAvailable()) {
      miniApp.mount();
    }

    initialized = true;
  } catch (error) {
    console.error("Telegram SDK initialization failed:", error);
  }
}

type TelegramUser = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
};

export function getTelegramUser(): TelegramUser | null {
  try {
    const launchParams = retrieveLaunchParams() as {
      initDataUnsafe?: {
        user?: TelegramUser;
      };
    };

    return launchParams.initDataUnsafe?.user ?? null;
  } catch (error) {
    console.error("Failed to get Telegram user:", error);
    return null;
  }
}