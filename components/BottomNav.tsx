"use client";

type BottomNavProps = {
  activeTab?: "home" | "tasks" | "leaderboard" | "profile";
};

function NavIcon({
  type,
}: {
  type: "home" | "tasks" | "leaderboard" | "profile";
}) {
  if (type === "home") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    );
  }

  if (type === "tasks") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="m12 3 2 6" />
        <path d="m21 12-6-2" />
      </svg>
    );
  }

  if (type === "leaderboard") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10" />
        <path d="M5 4h2v5a5 5 0 0 0 10 0V4h2" />
        <path d="M5 4a5 5 0 0 0 5 5" />
        <path d="M19 4a5 5 0 0 1-5 5" />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

export default function BottomNav({
  activeTab = "home",
}: BottomNavProps) {
  const items = [
    {
      id: "home" as const,
      label: "Home",
    },
    {
      id: "tasks" as const,
      label: "Tasks",
    },
    {
      id: "leaderboard" as const,
      label: "Ranking",
    },
    {
      id: "profile" as const,
      label: "Profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-2 pt-2 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {items.map((item) => {
          const active = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`flex min-w-[70px] flex-col items-center gap-1 rounded-2xl px-3 py-2 transition ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <NavIcon type={item.id} />

              <span
                className={`text-[11px] ${
                  active ? "font-bold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}