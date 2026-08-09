"use client";

import { supabase } from "@/lib/supabase";
import type { TelegramUser } from "@/lib/telegram";

export async function registerTelegramUser(user: TelegramUser) {
  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        telegram_id: user.id,
        username: user.username ?? null,
        first_name: user.first_name,
        last_name: user.last_name ?? null,
        photo_url: user.photo_url ?? null,
      },
      {
        onConflict: "telegram_id",
      }
    )
    .select()
    .single();

  if (error) {
    console.error("User registration failed:", error);
    throw error;
  }

  return data;
}