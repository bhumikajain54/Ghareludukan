import React from "react";
import { LifeBuoy, Clock, CheckCircle2, AlertOctagon, ArrowRight, TrendingUp } from "lucide-react";
import { MOCK_SUPPORT_METRICS, MOCK_SUPPORT_TICKETS } from "../SupportConstants";

export default function SupportDashboard({ onNav, onSelectTicket }) {
  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <LifeBuoy size={24} className="text-indigo-400" />
          <span>Support Desk & Resolution Center</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time queue of customer damage claims, delivery delay queries, and merchant payout issues.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400">Open Tickets</span>
          <p className="text-2xl font-black text-amber-400 mt-1">{MOCK_SUPPORT_METRICS.openTickets}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400">Avg Response Time</span>
          <p className="text-2xl font-black text-cyan-400 mt-1">{MOCK_SUPPORT_METRICS.avgResponseTimeMin}m</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400">Resolved Today</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">{MOCK_SUPPORT_METRICS.resolvedToday}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400">CSAT Score</span>
          <p className="text-2xl font-black text-purple-400 mt-1">★ {MOCK_SUPPORT_METRICS.csatScore}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white">Active Resolution Queue</h3>
          <button onClick={() => onNav("tickets")} className="text-xs text-indigo-400 font-bold hover:underline cursor-pointer">
            View All ({MOCK_SUPPORT_TICKETS.length})
          </button>
        </div>

        {MOCK_SUPPORT_TICKETS.map((t) => (
          <div
            key={t.id}
            onClick={() => {
              onSelectTicket(t.id);
              onNav("ticket-detail");
            }}
            className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-400">{t.ticketNumber}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-800 text-slate-300">
                  {t.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    t.priority === "HIGH" || t.priority === "CRITICAL"
                      ? "bg-rose-500/10 text-rose-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {t.priority}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-white mt-1">{t.subject}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                From: {t.userName} ({t.userType}) • {t.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
