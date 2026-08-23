import React, { useState } from "react";
import { FileText, Search, ShieldCheck, Download, Filter, Calendar } from "lucide-react";
import { MOCK_AUDIT_LOGS } from "../AdminConstants";

export default function AdminAuditLogs({ logs = MOCK_AUDIT_LOGS }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = logs.filter((log) => {
    if (roleFilter !== "all" && log.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        log.id.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.objectName.toLowerCase().includes(q) ||
        log.reason.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 gd-rise w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText size={24} className="text-cyan-400" />
            <span>Immutable Platform Audit Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Read-only chronological ledger of all administrative decisions, shop verification changes, and system overrides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Audit log export JSON/CSV downloaded.")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Event ID, Actor, Action Type, or Reason..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-cyan-400 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          {["all", "ADMIN", "SUPER_ADMIN"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                roleFilter === r
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {r === "all" ? "All Roles" : r.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-black text-slate-300 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-4">Timestamp & ID</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Transition</th>
                <th className="py-3.5 px-4">Audit Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-mono text-slate-200 font-bold">{log.id}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{log.timestamp}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{log.actor}</p>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-indigo-300 font-semibold">{log.action}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-white font-bold">{log.objectName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{log.objectId}</p>
                  </td>
                  <td className="py-3.5 px-4 text-[11px]">
                    <span className="text-slate-400">{log.previousStatus}</span>
                    <span className="text-cyan-400 mx-1">→</span>
                    <span className="text-cyan-400 font-bold">{log.newStatus}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs text-[11px] leading-relaxed">
                    {log.reason}
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
