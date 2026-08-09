"use client";

import { useEffect, useState } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { registerTelegramUser } from "@/lib/users";

type UserData = {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string;
  last_name: string | null;
  photo_url: string | null;
  coins: number;
};

export default function Home() {
  const { user } = useTelegram();

  const [dbUser, setDbUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function registerUser() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const savedUser = await registerTelegramUser(user);
        setDbUser(savedUser);
      } catch (err) {
        console.error(err);
        setError("User registration failed");
      } finally {
        setLoading(false);
      }
    }

    registerUser();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading RewardHub...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!user || !dbUser) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">RewardHub</h1>
        <p>Open RewardHub from Telegram.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">RewardHub</h1>

      {dbUser.photo_url && (
        <img
          src={dbUser.photo_url}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
      )}

      <h2 className="text-2xl font-semibold">
        Welcome, {dbUser.first_name}!
      </h2>

      <p>
        Username:{" "}
        {dbUser.username ? `@${dbUser.username}` : "Not available"}
      </p>

      <p>
        Telegram ID: {dbUser.telegram_id}
      </p>

      <div className="text-xl font-bold">
        🪙 Coins: {dbUser.coins}
      </div>
    </main>
  );
}