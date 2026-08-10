"use client";

type CoinBalanceProps = {
  coins: number;
};

export default function CoinBalance({ coins }: CoinBalanceProps) {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-[0_8px_30px_rgba(37,99,235,0.10)]">
      <div className="relative p-6">
        {/* Decorative background */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-200/30 blur-2xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Your Balance
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                ₹{coins.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              RewardHub Coins
            </p>
          </div>

          {/* INR Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-600/25">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white/80">
              <span className="text-3xl font-bold text-white">₹</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}