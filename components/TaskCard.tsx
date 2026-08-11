"use client";

import { useState } from "react";
import { getTelegramInitData } from "@/lib/telegram";

type TaskCardProps = {
  id: string;
  title: string;
  description: string;
  reward: number;
  taskUrl?: string | null;
  completed?: boolean;
  type?: "checkin" | "visit" | "challenge";
  onCompleted?: (taskId: string, reward: number) => void;
};

function TaskIcon({
  type,
}: {
  type: "checkin" | "visit" | "challenge";
}) {
  if (type === "checkin") {
    return (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <path d="m8 14 2 2 5-5" />
      </svg>
    );
  }

  if (type === "visit") {
    return (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 3h7v7" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </svg>
    );
  }

  return (
    <svg
      width="30"
      height="30"
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

export default function TaskCard({
  id,
  title,
  description,
  reward,
  completed = false,
  type = "checkin",
  onCompleted,
}: TaskCardProps) {
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [message, setMessage] = useState("");

  async function handleStart() {
    if (loading || isCompleted) {
      return;
    }

    setMessage("");

    try {
      /*
       * Telegram WebApp check
       */
      const telegram = window.Telegram?.WebApp;

      if (!telegram) {
        console.error("Telegram WebApp not found");
        setMessage("Please open the app inside Telegram.");
        return;
      }

      /*
       * Telegram WebApp ready
       */
      telegram.ready();

      /*
       * Debug information
       */
      console.log("========== TASK DEBUG ==========");
      console.log("Task ID:", id);
      console.log("Task title:", title);
      console.log("Telegram WebApp:", telegram);
      console.log("Telegram initData exists:", !!telegram.initData);
      console.log(
        "Telegram user:",
        telegram.initDataUnsafe?.user
      );
      console.log("================================");

      /*
       * Telegram initData
       */
      const initData = getTelegramInitData();

      if (!initData) {
        console.error("Telegram initData missing");
        setMessage("Telegram verification data missing.");
        return;
      }

      /*
       * Loading
       */
      setLoading(true);
      setMessage("Checking task...");

      /*
       * Complete task API
       */
      const response = await fetch("/api/tasks/complete", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          taskId: id,
          initData,
        }),
      });

      /*
       * JSON response
       */
      const result = await response.json();

      console.log("========== API RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", result);
      console.log("==================================");

      /*
       * Already completed
       */
      if (result.error === "ALREADY_COMPLETED") {
        setIsCompleted(true);
        setMessage("Already completed.");
        return;
      }

      /*
       * Telegram verification failed
       */
      if (result.error === "INVALID_TELEGRAM_DATA") {
        setMessage("Telegram verification failed.");
        return;
      }

      /*
       * User not found
       */
      if (result.error === "USER_NOT_FOUND") {
        setMessage("User account not found.");
        return;
      }

      /*
       * Task not found
       */
      if (result.error === "TASK_NOT_FOUND") {
        setMessage("Task not found.");
        return;
      }

      /*
       * Any other API error
       */
      if (!response.ok || !result.success) {
        console.error("Task API failed:", result);

        setMessage(
          result.error || "Task could not be completed."
        );

        return;
      }

      /*
       * SUCCESS
       */
      const earnedReward = Number(result.reward ?? reward);

      setIsCompleted(true);

      setMessage(
        `+${earnedReward.toLocaleString("en-IN")} coins added!`
      );

      /*
       * Dashboard ko notify
       */
      onCompleted?.(id, earnedReward);

      console.log(
        "TASK COMPLETED SUCCESSFULLY:",
        id,
        earnedReward
      );
    } catch (error) {
      console.error("TASK START ERROR:", error);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-4">

        {/* Task Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <TaskIcon type={type} />
        </div>

        {/* Task Content */}
        <div className="min-w-0 flex-1">

          <h3 className="truncate text-base font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
            {description}
          </p>

          {/* Reward */}
          <div className="mt-3 flex items-center gap-2">

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              ₹
            </span>

            <span className="text-sm font-bold text-blue-600">
              +{Number(reward).toLocaleString("en-IN")}
            </span>

            <span className="text-xs text-slate-400">
              Coins
            </span>

          </div>

          {/* Status Message */}
          {message && (
            <p
              className={`mt-2 text-xs font-semibold ${
                isCompleted
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {message}
            </p>
          )}

        </div>

        {/* Start Button */}
        <button
          type="button"
          disabled={loading || isCompleted}
          onClick={handleStart}
          className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
            isCompleted
              ? "cursor-not-allowed bg-green-50 text-green-600"
              : loading
                ? "cursor-wait bg-blue-300 text-white"
                : "bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {isCompleted
            ? "Done"
            : loading
              ? "Checking..."
              : "Start"}
        </button>

      </div>
    </div>
  );
}