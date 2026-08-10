"use client";

import { supabase } from "@/lib/supabase";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  reward: number;
  task_type: string;
  task_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("TASKS FETCH ERROR:", error);
    throw error;
  }

  return data ?? [];
}