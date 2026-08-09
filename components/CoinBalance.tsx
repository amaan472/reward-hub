"use client";

type CoinBalanceProps = {
  coins: number;
};

export default function CoinBalance({ coins }: CoinBalanceProps) {
  return (
    <div className="w-full rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-[1px] shadow-lg">
      <div className="rounded-3xl bg-slate-900 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">
              Your Balance
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-3xl">🪙</span>

              <span className="text-3xl font-bold text-white">
                {coins.toLocaleString()}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              RewardHub Coins
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400/20">
            <span className="text-3xl">💰</span>
          </div>
        </div>
      </div>
    </div>
  );
}