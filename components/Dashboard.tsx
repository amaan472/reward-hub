"use client";

import { useEffect, useState } from "react";
import CoinBalance from "@/components/CoinBalance";
import TaskCard from "@/components/TaskCard";
import BottomNav from "@/components/BottomNav";
import { getTasks, type Task } from "@/lib/tasks";

type DashboardProps = {
  firstName: string;
  coins: number;
};

export default function Dashboard({
  firstName,
  coins,
}: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [taskError, setTaskError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoadingTasks(true);
        setTaskError("");

        const data = await getTasks();

        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setTaskError("Unable to load tasks");
      } finally {
        setLoadingTasks(false);
      }
    }

    loadTasks();
  }, []);

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

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-600/20">
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Balance */}
        <CoinBalance coins={coins} />

        {/* Tasks */}
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

          {/* Loading */}
          {loadingTasks && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                Loading tasks...
              </p>
            </div>
          )}

          {/* Error */}
          {!loadingTasks && taskError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm font-medium text-red-600">
                {taskError}
              </p>
            </div>
          )}

          {/* No Tasks */}
          {!loadingTasks && !taskError && tasks.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                No tasks available right now.
              </p>
            </div>
          )}

          {/* Task List */}
          {!loadingTasks && !taskError && tasks.length > 0 && (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description ?? ""}
                  reward={task.reward}
                  type={
                    task.task_type === "visit"
                      ? "visit"
                      : task.task_type === "challenge"
                        ? "challenge"
                        : "checkin"
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </main>
  );
}