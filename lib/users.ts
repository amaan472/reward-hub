"use client";

import { supabase } from "@/lib/supabase";
import type { TelegramUser } from "@/lib/telegram";

export async function registerTelegramUser(user: TelegramUser) {
  console.log("Registering Telegram user:", user);

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
    console.error("SUPABASE ERROR MESSAGE:", error.message);
    console.error("SUPABASE ERROR DETAILS:", error.details);
    console.error("SUPABASE ERROR HINT:", error.hint);
    console.error("SUPABASE ERROR CODE:", error.code);
    console.error("FULL SUPABASE ERROR:", error);

    throw error;
  }

  console.log("USER SAVED SUCCESSFULLY:", data);

  return data;
}