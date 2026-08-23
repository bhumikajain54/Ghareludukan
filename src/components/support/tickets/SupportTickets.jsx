import React, { useState } from "react";
import { LifeBuoy, Search, Filter, ArrowRight } from "lucide-react";
import { MOCK_SUPPORT_TICKETS } from "../SupportConstants";

export default function SupportTickets({
  tickets = MOCK_SUPPORT_TICKETS,
  onSelectTicket,
  onNav,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = tickets.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.ticketNumber.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.userName.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 gd-rise w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <LifeBuoy size={24} className="text-indigo-400" />
            <span>Support Tickets Master Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Resolve issues for Customers, Sellers, and Delivery Partners with SLA tracking.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start">
          {["all", "OPEN", "IN_PROGRESS", "RESOLVED"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === s
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ticket ID, subject, customer or seller name..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-400 font-medium"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            onClick={() => {
              onSelectTicket(t.id);
              onNav("ticket-detail");
            }}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group shadow-md"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-400">{t.ticketNumber}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-800 text-slate-200">
                  {t.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    t.priority === "HIGH" || t.priority === "CRITICAL"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {t.priority}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 mt-1">{t.subject}</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                From: {t.userName} ({t.userType}) • SLA: <span className="text-indigo-400 font-bold">{t.slaDeadline}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {t.status}
              </span>
              <ArrowRight size={15} className="text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
