import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const botToken = process.env.TELEGRAM_BOT_TOKEN!;

const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

function validateTelegramInitData(initData: string) {
  try {
    const params = new URLSearchParams(initData);

    const receivedHash = params.get("hash");

    if (!receivedHash) {
      return null;
    }

    params.delete("hash");

    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest();

    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(calculatedHash),
        Buffer.from(receivedHash)
      )
    ) {
      return null;
    }

    const userData = params.get("user");

    if (!userData) {
      return null;
    }

    return JSON.parse(userData);

  } catch (error) {
    console.error("Telegram validation error:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { taskId, initData } = body;

    if (!taskId || !initData) {
      return NextResponse.json(
        {
          success: false,
          error: "MISSING_DATA",
        },
        { status: 400 }
      );
    }

    // Telegram user verify karo
    const telegramUser = validateTelegramInitData(initData);

    if (!telegramUser?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_TELEGRAM_DATA",
        },
        { status: 401 }
      );
    }

    // Secure database function call
    const { data, error } = await supabaseAdmin.rpc(
      "complete_task",
      {
        p_telegram_id: telegramUser.id,
        p_task_id: taskId,
      }
    );

    if (error) {
      console.error("COMPLETE TASK ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "DATABASE_ERROR",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("TASK API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}