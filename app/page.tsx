"use client";

import { useTelegram } from "@/hooks/useTelegram";

export default function Home() {
  const { user } = useTelegram();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">RewardHub</h1>

      {user ? (
        <>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> @{user.username}</p>
          <p><strong>Name:</strong> {user.first_name}</p>
        </>
      ) : (
        <p>Waiting for Telegram user...</p>
      )}
    </main>
  );
}