import React from "react";
import { BarChart3, TrendingUp, DollarSign, Download, Package, Users, Store } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MOCK_ADMIN_REPORTS } from "../AdminConstants";

export default function AdminReports() {
  return (
    <div className="space-y-6 gd-rise w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 size={24} className="text-cyan-400" />
            <span>Platform Financial & Fulfillment Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational summaries across gross merchandise value (GMV), fulfillment SLA compliance, and category distribution.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Statement generated and exported successfully.")}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-md shadow-cyan-600/30 transition-all cursor-pointer"
        >
          <Download size={14} />
          <span>Download Financial Statement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Volume by Month */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-black text-white">Monthly Hyperlocal Order Volumes</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ADMIN_REPORTS.monthlyGrowth}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="orders" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-black text-white">Marketplace GMV Category Distribution</h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_ADMIN_REPORTS.categoryShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_ADMIN_REPORTS.categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: 12, fontSize: 12 }}
                  formatter={(val) => [`${val}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            {MOCK_ADMIN_REPORTS.categoryShare.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-slate-300">{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
