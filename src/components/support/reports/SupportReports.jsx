import React from "react";
import { BarChart2, Star, Clock, CheckCircle2 } from "lucide-react";
import { MOCK_SUPPORT_METRICS } from "../SupportConstants";

export default function SupportReports() {
  return (
    <div className="space-y-6 gd-rise w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BarChart2 size={24} className="text-indigo-400" />
          <span>Support CSAT & SLA Compliance Reports</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          First response time, average resolution turnaround, and customer satisfaction metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400">First-Response Time (FRT)</span>
          <p className="text-2xl font-black text-indigo-300">{MOCK_SUPPORT_METRICS.avgResponseTimeMin} mins</p>
          <span className="text-[10px] text-cyan-400">Target &lt; 10 mins</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400">Avg Resolution Turnaround</span>
          <p className="text-2xl font-black text-cyan-300">{MOCK_SUPPORT_METRICS.avgResolutionTimeHours} hours</p>
          <span className="text-[10px] text-cyan-400">Target &lt; 4 hours</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400">Overall CSAT Rating</span>
          <p className="text-2xl font-black text-amber-400">★ {MOCK_SUPPORT_METRICS.csatScore}</p>
          <span className="text-[10px] text-slate-400">Based on 640 ratings</span>
        </div>
      </div>
    </div>
  );
}
