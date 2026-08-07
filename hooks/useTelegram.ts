"use client";

import { useEffect, useState } from "react";
import { getTelegramUser, initTelegram } from "@/lib/telegram";

export function useTelegram() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    initTelegram();

    const telegramUser = getTelegramUser();
    setUser(telegramUser);
  }, []);

  return {
    user,
  };
}