"use client";

export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};


export function initTelegram() {
  if (typeof window === "undefined") return;

  const telegram = window.Telegram?.WebApp;

  if (!telegram) {
    console.log("Telegram WebApp not found");
    return;
  }

  telegram.ready();
  telegram.expand();

  console.log("Telegram WebApp Ready");
}


export function getTelegramUser(): TelegramUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const telegram = window.Telegram?.WebApp;

  if (!telegram) {
    console.log("Telegram WebApp missing");
    return null;
  }


  const user = telegram.initDataUnsafe?.user;


  console.log("Telegram User:", user);


  if (!user) {
    return null;
  }


  return user as TelegramUser;
}