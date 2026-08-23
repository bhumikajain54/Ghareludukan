import React from "react";
import { CreditCard, CheckCircle2, Clock, AlertCircle, ArrowUpRight } from "lucide-react";

export default function AdminSettlements() {
  const settlements = [
    { id: "SET-8821", shop: "Raj Traders & Kirana", amount: 24850, netPaid: 23980, commission: 870, status: "PROCESSED", date: "20 Aug 2026", bank: "HDFC •••• 1029" },
    { id: "SET-8820", shop: "Sharma Daily Dairy & Sweets", amount: 18420, netPaid: 17499, commission: 921, status: "PROCESSED", date: "20 Aug 2026", bank: "SBI •••• 4492" },
    { id: "SET-8819", shop: "Mahaveer Gifts & Crockery", amount: 12900, netPaid: 11868, commission: 1032, status: "PROCESSED", date: "19 Aug 2026", bank: "ICICI •••• 9921" },
    { id: "SET-8818", shop: "Gupta Electronics & Appliances", amount: 6400, netPaid: 0, commission: 0, status: "ON_HOLD", date: "19 Aug 2026", reason: "Held due to open fraud investigation" },
  ];

  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <CreditCard size={24} className="text-cyan-400" />
          <span>Merchant Payout & Settlement Ledger</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          T+1 daily automated settlement records, platform commission deductions, and fraud hold accounts.
        </p>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-black text-slate-300 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-4">Settlement ID</th>
                <th className="py-3.5 px-4">Merchant Shop</th>
                <th className="py-3.5 px-4">Gross Sales</th>
                <th className="py-3.5 px-4">Platform Fee</th>
                <th className="py-3.5 px-4">Net Disbursed</th>
                <th className="py-3.5 px-4">Bank Target</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-300">{s.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{s.shop}</td>
                  <td className="py-3.5 px-4 text-slate-200">₹{s.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-cyan-400 font-bold">₹{s.commission}</td>
                  <td className="py-3.5 px-4 font-black text-cyan-400">₹{s.netPaid.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{s.bank || "N/A"}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        s.status === "PROCESSED"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
