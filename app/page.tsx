"use client";

import { useEffect, useState } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { registerTelegramUser } from "@/lib/users";
import Dashboard from "@/components/Dashboard";

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
        console.error("Registration error:", err);
        setError("User registration failed");
      } finally {
        setLoading(false);
      }
    }

    registerUser();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-slate-400">Loading RewardHub...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white px-6">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-400">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (!user || !dbUser) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-3xl font-bold">RewardHub</h1>

        <p className="mt-3 text-slate-400 text-center">
          Open RewardHub from Telegram to continue.
        </p>
      </main>
    );
  }

  return (
    <Dashboard
      firstName={dbUser.first_name}
      coins={dbUser.coins}
    />
  );
}