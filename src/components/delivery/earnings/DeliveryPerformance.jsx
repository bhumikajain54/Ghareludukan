import React from "react";
import { Award, Star, TrendingUp, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function DeliveryPerformance({ rider }) {
  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Award size={24} className="text-amber-400" />
          <span>Rider Performance & Badges</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Your quality ratings, fulfillment velocity, and tier rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400">Customer Rating</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400">★ 4.88</span>
            <span className="text-xs text-slate-500">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-400">Based on 380+ customer reviews.</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400">Completion Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-400">98.6%</span>
          </div>
          <p className="text-[11px] text-slate-400">428 / 434 orders fulfilled.</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400">On-Time Delivery Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-400">96.2%</span>
          </div>
          <p className="text-[11px] text-slate-400">Avg. delivery time: 18.5 mins.</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-cyan-400" />
          <span>Active Badges & Perks</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Star size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Super Fast Rider ⚡</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Delivered over 100 orders within 20 minutes.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Zero Damage Champion 🛡️</p>
              <p className="text-[11px] text-slate-400 mt-0.5">30 consecutive days with zero product spill or breakage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
