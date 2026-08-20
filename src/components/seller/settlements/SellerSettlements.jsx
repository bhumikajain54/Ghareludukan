import React, { useState } from "react";
import {
  Wallet, TrendingDown, CheckCircle2, Clock,
  Download, Eye, ChevronRight, IndianRupee, X,
} from "lucide-react";
import { MOCK_SETTLEMENTS, SETTLEMENT_STATUS_COLOR, inr } from "../SellerConstants";

function SettlementDetail({ settlement, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl gd-rise">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div>
            <div className="font-bold text-slate-100">{settlement.id}</div>
            <div className="text-xs text-slate-500 mt-0.5">{settlement.period}</div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-500">
            <X size={16} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: "Gross Order Value", value: inr(settlement.grossOrderValue), cls: "text-slate-200" },
            { label: "Refunds & Adjustments", value: `−${inr(settlement.refunds)}`, cls: "text-red-400" },
            { label: "Platform Commission", value: `−${inr(settlement.commission)}`, cls: "text-red-400" },
            { label: "Other Charges", value: `−${inr(settlement.otherCharges)}`, cls: "text-red-400" },
          ].map(({ label, value, cls }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-slate-800">
              <span className="text-sm text-slate-400">{label}</span>
              <span className={`font-mono font-bold text-sm ${cls}`}>{value}</span>
            </div>
          ))}
          <div className="pt-3 flex items-center justify-between">
            <span className="text-base font-extrabold text-slate-100">Seller Payable</span>
            <span className="font-mono font-extrabold text-2xl text-emerald-400">{inr(settlement.netPayable)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Settlement Date</span>
            <span className="text-slate-400 font-semibold">{settlement.date}</span>
          </div>
          <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border ${SETTLEMENT_STATUS_COLOR[settlement.status]}`}>
            {settlement.status}
          </span>
        </div>
        <div className="px-5 pb-5 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">
            <Download size={14} /> Download
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SellerSettlements({ onNav }) {
  const [selected, setSelected] = useState(null);

  const totalPaid = MOCK_SETTLEMENTS.filter((s) => s.status === "PAID").reduce((sum, s) => sum + s.netPayable, 0);
  const pending = MOCK_SETTLEMENTS.find((s) => s.status === "PROCESSING");
  const commission = MOCK_SETTLEMENTS.reduce((sum, s) => sum + s.commission, 0);

  return (
    <div className="space-y-5 gd-rise">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Settlements</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track your earnings and settlement history.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNav?.("transactions")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            Live Transactions
          </button>
          <button
            onClick={() => onNav?.("invoices")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            Tax Invoices
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Available Settlement", value: pending ? inr(pending.netPayable) : "—", icon: Wallet, color: "bg-emerald-500/10 text-emerald-400", sub: "Processing" },
          { label: "Pending Review", value: "—", icon: Clock, color: "bg-amber-500/10 text-amber-400", sub: "None pending" },
          { label: "Paid This Month", value: inr(totalPaid), icon: CheckCircle2, color: "bg-indigo-500/10 text-indigo-400", sub: "3 settlements" },
          { label: "Total Commission", value: inr(commission), icon: TrendingDown, color: "bg-red-500/10 text-red-400", sub: "Platform fee" },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <div className="font-mono text-xl font-extrabold text-slate-100">{value}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-0.5">{label}</div>
            {sub && <div className="text-[10px] text-slate-600 mt-1">{sub}</div>}
          </div>
        ))}
      </div>

      {/* How Settlement Works */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4 text-xs text-indigo-300">
        <div className="font-bold mb-1 text-indigo-200">💡 How settlements work</div>
        Gross Order Value − Refunds − Platform Commission − Charges = <strong>Net Seller Payable</strong>.
        Settlements are processed every 15 days.
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden ticket-table-container">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 ticket-table-header">
                {["Settlement ID", "Period", "Gross Value", "Refunds", "Commission", "Other", "Net Payable", "Status", "Date", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_SETTLEMENTS.map((s) => (
                <tr key={s.id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors ticket-row-hover">
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-indigo-400">{s.id}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{s.period}</td>
                  <td className="px-4 py-3.5 font-mono text-sm text-slate-300">{inr(s.grossOrderValue)}</td>
                  <td className="px-4 py-3.5 font-mono text-sm text-red-400">{s.refunds > 0 ? `−${inr(s.refunds)}` : "—"}</td>
                  <td className="px-4 py-3.5 font-mono text-sm text-red-400">−{inr(s.commission)}</td>
                  <td className="px-4 py-3.5 font-mono text-sm text-slate-500">{s.otherCharges > 0 ? `−${inr(s.otherCharges)}` : "—"}</td>
                  <td className="px-4 py-3.5 font-mono text-sm font-extrabold text-emerald-400">{inr(s.netPayable)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${SETTLEMENT_STATUS_COLOR[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{s.date}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setSelected(s)} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {MOCK_SETTLEMENTS.map((s) => (
          <button key={s.id} onClick={() => setSelected(s)} className="w-full text-left bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-mono text-xs font-bold text-indigo-400">{s.id}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.period}</div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${SETTLEMENT_STATUS_COLOR[s.status]}`}>{s.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">Net Payable</div>
              <div className="font-mono font-extrabold text-lg text-emerald-400">{inr(s.netPayable)}</div>
            </div>
          </button>
        ))}
      </div>

      {selected && <SettlementDetail settlement={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
