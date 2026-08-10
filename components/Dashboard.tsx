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
    type: "checkin" as const,
  },
  {
    id: 2,
    title: "Visit RewardHub",
    description: "Open RewardHub and claim your daily reward",
    reward: 50,
    type: "visit" as const,
  },
  {
    id: 3,
    title: "Daily Challenge",
    description: "Complete today's challenge",
    reward: 200,
    type: "challenge" as const,
  },
];

export default function Dashboard({
  firstName,
  coins,
}: DashboardProps) {
  return (
    <main className="min-h-screen bg-white pb-28 text-slate-900">
      <div className="mx-auto w-full max-w-md px-4 pt-6">
        {/* Header */}
        <header className="mb-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Welcome back 👋
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                {firstName}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Complete tasks and earn rewards
              </p>
            </div>

            {/* Profile Circle */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-600/20">
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Balance */}
        <CoinBalance coins={coins} />

        {/* Daily Tasks */}
        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Daily Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete tasks to earn coins
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
              {tasks.length} Tasks
            </span>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                reward={task.reward}
                type={task.type}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </main>
  );
}