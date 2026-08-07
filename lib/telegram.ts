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

export function getTelegramUser() {
  try {
    const { initDataUnsafe } = retrieveLaunchParams();

    return initDataUnsafe.user ?? null;
  } catch {
    return null;
  }
}