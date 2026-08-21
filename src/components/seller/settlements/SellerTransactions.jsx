import React, { useState } from "react";
import {
  ArrowDownLeft, ArrowUpRight, Search, Download, Filter,
  Calendar, CheckCircle2, Clock, AlertCircle, RefreshCw, ChevronRight,
  IndianRupee, CreditCard, Smartphone, Banknote,
} from "lucide-react";
import { inr } from "../SellerConstants";

export default function SellerTransactions({ onNav }) {
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      id: "TXN-98421",
      orderId: "GLD10245",
      type: "ORDER_PAYOUT",
      desc: "UPI Payout for Order #GLD10245 (Rahul Sharma)",
      amount: 825,
      commission: 41.25,
      net: 783.75,
      paymentMethod: "UPI",
      status: "COMPLETED",
      date: "Today, 10:45 AM",
    },
    {
      id: "TXN-98420",
      orderId: "GLD10244",
      type: "ORDER_PAYOUT",
      desc: "COD Order collected for Order #GLD10244 (Priya Gupta)",
      amount: 622,
      commission: 31.10,
      net: 590.90,
      paymentMethod: "COD",
      status: "COMPLETED",
      date: "Today, 10:20 AM",
    },
    {
      id: "TXN-98419",
      orderId: "GLD10243",
      type: "ORDER_PAYOUT",
      desc: "Online card payment for Order #GLD10243 (Amit Verma)",
      amount: 342,
      commission: 17.10,
      net: 324.90,
      paymentMethod: "CARD",
      status: "PROCESSING",
      date: "Today, 09:58 AM",
    },
    {
      id: "TXN-98418",
      orderId: "GLD10239",
      type: "REFUND_DEBIT",
      desc: "Customer cancellation refund debit #GLD10239",
      amount: -460,
      commission: 0,
      net: -460.00,
      paymentMethod: "UPI",
      status: "REFUNDED",
      date: "Yesterday, 11:30 AM",
    },
    {
      id: "TXN-98415",
      orderId: "SETTLE-W33",
      type: "BANK_SETTLEMENT",
      desc: "Weekly Settlement Payout to HDFC Bank A/C ...8821",
      amount: 39124,
      commission: 0,
      net: 39124.00,
      paymentMethod: "NEFT",
      status: "COMPLETED",
      date: "Aug 15, 2026",
    },
    {
      id: "TXN-98410",
      orderId: "GLD10240",
      type: "ORDER_PAYOUT",
      desc: "Delivered order settlement #GLD10240 (Meera Singh)",
      amount: 195,
      commission: 9.75,
      net: 185.25,
      paymentMethod: "UPI",
      status: "COMPLETED",
      date: "Aug 14, 2026",
    },
  ];

  const filtered = transactions.filter((t) => {
    const matchesFilter =
      filterType === "ALL" ||
      (filterType === "PAYOUT" && t.amount > 0 && t.type !== "BANK_SETTLEMENT") ||
      (filterType === "SETTLEMENT" && t.type === "BANK_SETTLEMENT") ||
      (filterType === "REFUND" && t.amount < 0);
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalInflow = transactions.filter((t) => t.amount > 0 && t.type !== "BANK_SETTLEMENT").reduce((s, t) => s + t.net, 0);
  const totalSettled = transactions.filter((t) => t.type === "BANK_SETTLEMENT").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6 gd-rise w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Live Transactions</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time ledger of order earnings, deductions, refunds, and bank settlements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNav?.("settlements")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            View Settlements
          </button>
          <button
            onClick={() => alert("Downloading Transaction Statement (CSV)...")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950/40 cursor-pointer"
          >
            <Download size={14} />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Net Inflow (Week)</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <ArrowDownLeft size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{inr(totalInflow)}</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
            Direct customer order payouts
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Bank Transferred</span>
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{inr(totalSettled)}</div>
          <span className="text-[11px] text-indigo-400 font-semibold mt-1 inline-block">
            Credited directly to linked bank account
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Average Commission</span>
            <div className="p-2 rounded-xl bg-violet-500/15 text-violet-400">
              <IndianRupee size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">5.0%</div>
          <span className="text-[11px] text-slate-400 font-semibold mt-1 inline-block">
            Fair neighborhood platform rate
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "ALL", label: "All Transactions" },
            { id: "PAYOUT", label: "Order Payouts" },
            { id: "SETTLEMENT", label: "Bank Settlements" },
            { id: "REFUND", label: "Refunds" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex-shrink-0 cursor-pointer ${
                filterType === f.id
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-950/30"
                  : "seller-tab-inactive bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search TXN ID or Order #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg ticket-table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 ticket-table-header text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Txn ID / Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Gross</th>
                <th className="py-3 px-4 text-right">Fee</th>
                <th className="py-3 px-4 text-right">Net Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No transactions match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isPositive = item.net > 0;
                  const isSettlement = item.type === "BANK_SETTLEMENT";

                  return (
                    <tr key={item.id} className="ticket-row-hover hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-slate-200">{item.id}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.date}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-slate-200 truncate">{item.desc}</div>
                        <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{item.orderId}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px] font-bold">
                          {item.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                        {item.amount < 0 ? `−${inr(Math.abs(item.amount))}` : inr(item.amount)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                        {item.commission > 0 ? `−${inr(item.commission)}` : "—"}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-sm">
                        <span
                          className={
                            isSettlement
                              ? "text-indigo-400"
                              : isPositive
                              ? "text-emerald-400"
                              : "text-red-400"
                          }
                        >
                          {isPositive ? `+${inr(item.net)}` : `−${inr(Math.abs(item.net))}`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            item.status === "COMPLETED"
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : item.status === "PROCESSING"
                              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                              : "bg-red-500/15 text-red-400 border-red-500/30"
                          }`}
                        >
                          {item.status === "COMPLETED" && <CheckCircle2 size={10} />}
                          {item.status === "PROCESSING" && <Clock size={10} />}
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
