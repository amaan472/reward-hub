"use client";

import CoinBalance from "@/components/CoinBalance";
import TaskCard from "@/components/TaskCard";
import BottomNav from "@/components/BottomNav";

type DashboardProps = {
  firstName: string;
  coins: number;
};

const tasks = [
  {
    id: 1,
    title: "Daily Check-in",
    description: "Complete your daily check-in",
    reward: 100,
  },
  {
    id: 2,
    title: "Visit RewardHub",
    description: "Open RewardHub and claim your daily reward",
    reward: 50,
  },
  {
    id: 3,
    title: "Daily Challenge",
    description: "Complete today's challenge",
    reward: 200,
  },
];

export default function Dashboard({
  firstName,
  coins,
}: DashboardProps) {
  return (
    <main className="min-h-screen bg-slate-950 pb-24 text-white">
      <div className="mx-auto w-full max-w-md px-4 pt-6">
        {/* Header */}
        <header className="mb-6">
          <p className="text-sm text-slate-400">Welcome back 👋</p>

          <h1 className="mt-1 text-2xl font-bold">
            {firstName}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Complete tasks and earn rewards
          </p>
        </header>

        {/* Coins */}
        <CoinBalance coins={coins} />

        {/* Daily Tasks */}
        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Daily Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete tasks to earn coins
              </p>
            </div>

            <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-400">
              3 Tasks
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                reward={task.reward}
              />
            ))}
          </div>
        </section>

        {/* Bottom Navigation */}
        <BottomNav activeTab="home" />
      </div>
    </main>
  );
}