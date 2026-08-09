"use client";

type BottomNavProps = {
  activeTab?: "home" | "tasks" | "leaderboard" | "profile";
};

export default function BottomNav({
  activeTab = "home",
}: BottomNavProps) {
  const items = [
    {
      id: "home" as const,
      label: "Home",
      icon: "🏠",
    },
    {
      id: "tasks" as const,
      label: "Tasks",
      icon: "🎯",
    },
    {
      id: "leaderboard" as const,
      label: "Ranking",
      icon: "🏆",
    },
    {
      id: "profile" as const,
      label: "Profile",
      icon: "👤",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 px-2 pb-safe backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {items.map((item) => {
          const active = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
                active
                  ? "bg-yellow-400/10 text-yellow-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              <span className="text-[11px] font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}