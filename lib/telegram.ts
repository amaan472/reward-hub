"use client";

import {
  init,
  miniApp,
  retrieveLaunchParams,
} from "@telegram-apps/sdk";

let initialized = false;

export function initTelegram() {
  if (initialized || typeof window === "undefined") return;

  try {
    init();

    if (miniApp.mount.isAvailable()) {
      miniApp.mount();
    }

    initialized = true;

    console.log("Telegram SDK initialized");
  } catch (error) {
    console.error(
      "Telegram SDK initialization failed:",
      error
    );
  }
}


export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};


export function getTelegramUser(): TelegramUser | null {
  try {

    const launchParams = retrieveLaunchParams();

    console.log(
      "Telegram Launch Params:",
      launchParams
    );


    const initDataUnsafe = (
      launchParams as any
    )?.initDataUnsafe;


    console.log(
      "Telegram User Data:",
      initDataUnsafe?.user
    );


    if (!initDataUnsafe?.user) {
      console.log(
        "Telegram user not found"
      );

      return null;
    }


    return initDataUnsafe.user as TelegramUser;


  } catch (error) {

    console.error(
      "Get Telegram User Error:",
      error
    );

    return null;
  }
}