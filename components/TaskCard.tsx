"use client";

type TaskCardProps = {
  title: string;
  description: string;
  reward: number;
  completed?: boolean;
};

export default function TaskCard({
  title,
  description,
  reward,
  completed = false,
}: TaskCardProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {description}
          </p>

          <div className="mt-3 flex items-center gap-1">
            <span className="text-lg">🪙</span>

            <span className="text-sm font-bold text-yellow-400">
              +{reward.toLocaleString()}
            </span>

            <span className="text-xs text-slate-500">
              Coins
            </span>
          </div>
        </div>

        <button
          disabled={completed}
          className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${
            completed
              ? "cursor-not-allowed bg-slate-700 text-slate-400"
              : "bg-yellow-400 text-slate-900 hover:bg-yellow-300 active:scale-95"
          }`}
        >
          {completed ? "Completed" : "Start"}
        </button>
      </div>
    </div>
  );
}