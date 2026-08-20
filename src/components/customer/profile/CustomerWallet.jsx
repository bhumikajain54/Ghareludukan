import React from "react";
import {
  Wallet, ShieldCheck, ArrowUpRight, ArrowDownLeft,
  Sparkles, CheckCircle2, RotateCcw,
} from "lucide-react";
import { inr } from "../CustomerConstants";

export default function CustomerWallet({ onNav }) {
  const transactions = [
    {
      id: "wt1",
      title: "Refund Processed (Order #GLD10239)",
      date: "Aug 15, 2026 · 11:25 AM",
      amount: "+₹460.00",
      type: "credit",
      desc: "Instant customer wallet refund for out-of-stock item",
    },
    {
      id: "wt2",
      title: "Order Payment Deduction (Order #GLD10242)",
      date: "Aug 12, 2026 · 09:30 AM",
      amount: "-₹175.00",
      type: "debit",
      desc: "Paid to Raj Traders via Ghareludukan Cash",
    },
    {
      id: "wt3",
      title: "Hyperlocal Welcome Bonus",
      date: "Aug 01, 2026 · 10:00 AM",
      amount: "+₹55.00",
      type: "credit",
      desc: "Promotional promotional credit for new neighborhood customer",
    },
  ];

  return (
    <div className="gd-rise space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white">Wallet & Cash</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          View your instant refund balance, cashback credits, and transaction ledger
        </p>
      </div>

      {/* Balance Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={13} /> Available Balance
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
            Active
          </span>
        </div>

        <div>
          <div className="text-3xl sm:text-4xl font-black text-white">₹340.00</div>
          <p className="text-xs text-slate-400 mt-1">
            Zero-wait instant checkout balance. Applied automatically during checkout.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2.5">
          <button
            onClick={() => onNav("home")}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-extrabold text-xs hover:bg-cyan-400 shadow-lg shadow-cyan-950 transition-all cursor-pointer"
          >
            Shop & Spend Cash
          </button>
          <button
            onClick={() => onNav("orders")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
          >
            Check Refund Statuses
          </button>
        </div>
      </div>

      {/* Ledger */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="text-sm font-extrabold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-cyan-400" />
            <span>Transaction Ledger</span>
          </div>
          <span className="text-xs text-slate-400 font-normal">Last 30 days</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {transactions.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    tx.type === "credit"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {tx.type === "credit" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">{tx.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{tx.desc}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">{tx.date}</div>
                </div>
              </div>

              <div
                className={`text-sm font-black flex-shrink-0 ${
                  tx.type === "credit" ? "text-emerald-400" : "text-slate-200"
                }`}
              >
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
