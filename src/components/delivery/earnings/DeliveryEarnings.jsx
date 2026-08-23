import React, { useState } from "react";
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Download,
  Calendar,
  CheckCircle2,
  Gift,
  Clock,
} from "lucide-react";
import { MOCK_DELIVERY_EARNINGS } from "../DeliveryConstants";

export default function DeliveryEarnings({ earnings = MOCK_DELIVERY_EARNINGS }) {
  const [period, setPeriod] = useState("thisWeek"); // 'today' | 'thisWeek' | 'thisMonth'
  const activeData = earnings[period] || earnings.thisWeek;

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Wallet size={24} className="text-cyan-400" />
            <span>Earnings & Payouts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track daily trip fares, customer tips, surge incentives, and weekly bank settlements.
          </p>
        </div>

        {/* Period Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start">
          {[
            { id: "today", label: "Today" },
            { id: "thisWeek", label: "This Week" },
            { id: "thisMonth", label: "This Month" },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                period === p.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Big Earnings Card */}
      <div className="welcome-banner p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Total Earnings ({period === "today" ? "Today" : period === "thisWeek" ? "This Week" : "This Month"})
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-white">₹{activeData.total}</span>
              <span className="text-xs text-cyan-400 font-bold flex items-center">
                <ArrowUpRight size={14} /> +18% vs last cycle
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {activeData.tripsCount} trips fulfilled • {activeData.onlineHours} on duty
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/80 text-right">
            <span className="text-[11px] font-bold text-slate-400 block">Next Auto-Payout Date</span>
            <span className="text-sm font-black text-white">Every Monday, 06:00 AM</span>
            <span className="text-[10px] text-cyan-400 block mt-0.5">Direct to HDFC A/c •••• 8821</span>
          </div>
        </div>

        {/* 3 Component Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 block">Base Trip Fares</span>
            <p className="text-lg font-black text-white mt-0.5">₹{activeData.basePay}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 block">Customer Tips (100% Rider)</span>
            <p className="text-lg font-black text-amber-400 mt-0.5">₹{activeData.tips}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 block">Rain / Surge Incentives</span>
            <p className="text-lg font-black text-cyan-400 mt-0.5">₹{activeData.incentives}</p>
          </div>
        </div>
      </div>

      {/* Payout History Ledger */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Clock size={18} className="text-cyan-400" />
          <span>Past Weekly Bank Disbursals</span>
        </h2>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden divide-y divide-slate-800">
          {earnings.payoutHistory?.map((payout) => (
            <div
              key={payout.id}
              className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-black text-xs">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">{payout.id}</p>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {payout.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{payout.ref}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-black text-white">₹{payout.amount}</p>
                <p className="text-[10px] text-slate-400">{payout.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
