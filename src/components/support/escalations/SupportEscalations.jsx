import React from "react";
import { AlertOctagon, ArrowRight, ShieldAlert } from "lucide-react";
import { MOCK_SUPPORT_TICKETS } from "../SupportConstants";

export default function SupportEscalations({ onSelectTicket, onNav }) {
  const escalated = MOCK_SUPPORT_TICKETS.filter((t) => t.status === "ESCALATED");

  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <AlertOctagon size={24} className="text-rose-400" />
          <span>Priority Escalation Desk (L2 / L3)</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          High-severity disputes requiring administrative intervention or legal/fraud oversight.
        </p>
      </div>

      <div className="space-y-3">
        {escalated.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center text-slate-400">
            <p>No open escalations right now.</p>
          </div>
        ) : (
          escalated.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                onSelectTicket(t.id);
                onNav("ticket-detail");
              }}
              className="p-5 rounded-3xl bg-slate-900 border border-rose-500/30 hover:border-rose-500/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-rose-400">{t.ticketNumber}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/10 text-rose-400">
                    {t.priority} PRIORITY
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">{t.subject}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Assigned: {t.assignedTo}</p>
              </div>

              <button className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200">
                Review Escalation
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
